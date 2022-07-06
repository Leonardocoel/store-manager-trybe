const sinon = require("sinon");
const { expect } = require("chai");

const productsService = require("../../../services/productsService");
const salesService = require("../../../services/salesService");
const salesModel = require("../../../models/salesModel");
const salesProductsModel = require("../../../models/salesProductsModel");
const Sales = require("../../../schemas/SalesValidations");
const {
  rightSaleBody,
  saleCreateResponse,
} = require("../../../__tests__/_dataMock");

describe("Sales services tests:", () => {
  describe("Create", () => {
    describe("New sale", () => {
      describe("Fails validation if", () => {
        afterEach(async () => {
          productsService.getById.restore();
        });
        it("does not have the productId property", async () => {
          sinon.stub(productsService, "getById").returns(true);
          const response = await salesService.create([{ quantity: 1 }]);

          expect(response).to.be.eql({
            code: 400,
            message: '"productId" is required',
          });
        });

        it("does not have the quantity property", async () => {
          sinon.stub(productsService, "getById").returns(true);

          const response = await salesService.create([{ productId: 1 }]);

          expect(response).to.be.eql({
            code: 400,
            message: '"quantity" is required',
          });
        });

        it("does not have the property quantity greater than or equal to one", async () => {
          sinon.stub(productsService, "getById").returns(true);
          const response = await salesService.create([
            { productId: 1, quantity: 0 },
          ]);

          expect(response).to.be.eql({
            code: 422,
            message: '"quantity" must be greater than or equal to 1',
          });
        });

        it("does not have the productId in the database", async () => {
          sinon.stub(productsService, "getById").returns(undefined);
          const response = await salesService.create([
            { productId: 0, quantity: 1 },
          ]);

          expect(response).to.be.eql({
            code: 404,
            message: "Product not found",
          });
        });
      });
      describe("When inserted with sucess", () => {
        before(async () => {
          sinon.stub(salesModel, "create").resolves({ id: 3 });
          sinon.stub(Sales, "itemsValidation").resolves(undefined);
        });

        afterEach(async () => {
          salesProductsModel.create.restore();
        });

        after(async () => {
          salesModel.create.restore();
          Sales.itemsValidation.restore();
        });

        it("Verifies if the function is called with the correct parameters", async () => {
          const spy = sinon.stub(salesProductsModel, "create");

          await salesService.create(rightSaleBody);

          expect(spy.calledTwice).to.be.true;
          expect(spy.args[0]).to.eql([3, 1, 1]);
          expect(spy.secondCall.calledWith(3, 2, 5)).to.be.true;
        });

        it("Verifies if the function return a object with the correct parameters", async () => {
          sinon.stub(salesProductsModel, "create").returns();

          const response = await salesService.create(rightSaleBody);

          expect(response).to.be.an("object");
          expect(response).to.have.all.keys(["code", "sale"]);
          expect(response.sale).to.have.all.keys(["id", "itemsSold"]);
          expect(response).to.be.eql({ code: 201, sale: saleCreateResponse });
        });
      });
    });
  });
});
