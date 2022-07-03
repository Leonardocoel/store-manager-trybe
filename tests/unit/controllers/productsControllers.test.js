const sinon = require("sinon");
const { expect } = require("chai");

const productsService = require("../../../services/productsService");
const productsController = require("../../../controllers/productsController");
const { allProductsResponse } = require("../../../__tests__/_dataMock");

describe("Products controller tests", () => {
  describe("Read request tests", () => {
    describe("Require all data", () => {
      describe("When the result is undefined", () => {
        const res = {};
        const req = {};
        const next = sinon.stub().returns();

        before(async () => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(productsService, "getAll").resolves(undefined);
        });
        after(async () => {
          productsService.getAll.restore();
        });

        it("Verifies if the status is called with the code 404", async () => {
          await productsController.getAll(req, res, next);
          expect(res.status.calledWith(404)).to.be.true;
        });

        it('Verifies if the json is called with the message "There are no products"', async () => {
          await productsController.getAll(req, res, next);
          expect(res.json.calledWith({ message: "There are no products" })).to
            .be.true;
        });
      });
      describe("When the result is defined", () => {
        const req = {};
        const res = {};
        const next = sinon.stub().returns();

        before(async () => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(productsService, "getAll").resolves(allProductsResponse);
        });
        after(async () => {
          productsService.getAll.restore();
        });

        it("Verifies if the status is called with the code 200", async () => {
          await productsController.getAll(req, res, next);
          expect(res.status.calledWith(200)).to.be.true;
        });

        it("Verify if it sends an array of objects", async () => {
          const result = await productsService.getAll();

          expect(result).to.be.an("array");
          result.forEach((r) => {
            expect(r).to.be.an("object");
            expect(r).to.have.all.keys(["id", "name"]);
          });
        });
      });
    });
    describe("Require data by id", () => {
      describe("When the result is undefined", () => {
        const res = {};
        const req = {};
        const next = sinon.stub().returns();

        before(async () => {
          req.params = { id: 2 };
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(productsService, "getById").resolves(undefined);
        });
        after(async () => {
          productsService.getById.restore();
        });

        it("Verifies if the status is called with the code 404", async () => {
          await productsController.getById(req, res, next);
          expect(res.status.calledWith(404)).to.be.true;
        });

        it('Verifies if the json is called with the message "Product not found"', async () => {
          await productsController.getById(req, res, next);
          expect(res.json.calledWith({ message: "Product not found" })).to.be
            .true;
        });
      });
      describe("When the result is defined", () => {
        const req = {};
        const res = {};
        const next = sinon.stub().returns();

        before(async () => {
          req.params = { id: 2 };
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon
            .stub(productsService, "getById")
            .resolves(allProductsResponse[1]);
        });
        after(async () => {
          productsService.getById.restore();
        });

        it("Verifies if the status is called with the code 200", async () => {
          await productsController.getById(req, res, next);

          expect(res.status.calledWith(200)).to.be.true;
        });

        it("Verify if it returns an object", async () => {
          const response = await productsService.getById();

          expect(response).to.be.an("object");
        });

        it("Verify if the object has the correct information", async () => {
          const response = await productsService.getById();
          expect(response).to.have.property("id", 2);
          expect(response).to.be.equal(allProductsResponse[1]);
        });
      });
    });
  });
});
