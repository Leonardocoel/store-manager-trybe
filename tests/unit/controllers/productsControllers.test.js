const sinon = require("sinon");
const { expect } = require("chai");

const productsService = require("../../../services/productsService");
const productsController = require("../../../controllers/productsController");
const { allProductsResponse } = require("../../../__tests__/_dataMock");

describe("Products controller tests", () => {
  describe("Read request tests", () => {
    describe("Require all data", () => {
      describe("When the result is undefined", async () => {
        const res = {};
        const req = {};
        const next = sinon.stub().returns();

        before(() => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(productsService, "getAll").resolves(undefined);
        });
        after(() => {
          productsService.getAll.restore();
        });

        it("Verifies if the status is called with the code 404", async () => {
          await productsController.getAll(req, res, next);
          expect(res.status.calledWith(404)).to.be.true;
        });

        it('Verifies if the json is called with the message "There are no products"', async () => {
          await productsController.getAll(req, res, next);
          expect(res.json.calledWith({ message: 'There are no products' })).to.be.true
        });
      });
      describe("When the result is defined", () => {
        const req = {};
        const res = {};
        const next = sinon.stub().returns();

        before(() => {
          req.status = sinon.stub().returns(res);
          req.json = sinon.stub();

          sinon.stub(productsService, "getAll").resolves(allProductsResponse);
        });
        after(() => {
          productsService.getAll.restore();
        });

        it("Verifies if the status is called with the code 200", async () => {
          await productsController.getAll(res, req, next);
          expect(req.status.calledWith(200)).to.be.true;
        });

        it("Verify if it sends an array of objects", async () => {
          const result = await productsService.getAll(res, req, next);
          
          expect(result).to.be.an("array");
          result.forEach((r) => {
            expect(r).to.be.an("object");
            expect(r).to.have.all.keys(["id", "name"]);
          });
        });
      });
    });
  });
});
