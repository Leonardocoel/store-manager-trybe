const sinon = require("sinon");
const { expect } = require("chai");

const salesService = require("../../../services/salesService");
const salesModel = require("../../../models/salesModel");
const salesProductsModel = require("../../../models/salesProductsModel");
const { ERR_MSG } = require("../../../helpers/httpStatusCode");
const {
  rightSaleBody,
  saleCreateResponse,
} = require("../../../__tests__/_dataMock");

describe("Products services tests", () => {
  describe("Create tests", () => {
    describe("Implement new product", () => {
      describe("When fails validation", () => {});
      describe("When inserted with sucess", () => {
        before(async () => {
          sinon.stub(salesModel, "create").resolves({ id: 3 });
        });

        afterEach(async () => {
          salesProductsModel.create.restore();
        });

        after(async () => {
          salesModel.create.restore();
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

          expect(response).to.be.an("object")
          expect(response).to.have.all.keys(["status", "sale"]);
          expect(response.sale).to.have.all.keys(['id', 'itemsSold'])
        });
      });
    });
  });
});
