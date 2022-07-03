const sinon = require("sinon");
const { expect } = require("chai");

const productsService = require("../../../services/productsService");
const productsController = require("../../../controllers/productsController");
const { allProductsResponse } = require("../../../__tests__/_dataMock");

describe("Products controller tests", () => {
  describe("Read request tests", () => {
    describe("Require all data", () => {
      describe("When the result is undefined", () => {
        const response = {};
        const request = {};

        before(() => {
          response.status = sinon.stub().returns(response);
          response.send = sinon.stub().returns;

          sinon.stub(productsService, "getAll").resolves(false);
        });
        after(() => {
          productsService.getAll.restore();
        });

        it("Verifies if the status is called with the code 400", async () => {
          await productsController.getAll(request, response);
          expect(response.status.calledWith(400)).to.be.true;
        });

        it('Verifies if the send is called with the message "There are no products"', async () => {
          await productsController.getAll(request, response);
          expect(response.send.calledWith("There are no products")).to.be.true;
        });
      });
      describe("When the result is defined", () => {
        const response = {};
        const request = {};

        before(() => {
          response.status = sinon.stub().returns(response);
          response.send = sinon.stub().resolves(allProductsResponse);

          sinon.stub(productsService, "getAll").resolves(true);
        });
        after(() => {
          productsService.getAll.restore();
        });

        it("Verifies if the status is called with the code 200", async () => {
          await productsController.getAll(request, response);
          expect(response.status.calledWith(200)).to.be.true;
        });

        it("Verify if it sends an array of objects", async () => {
          await productsController.getAll(request, response);

          expect(response.send).to.be.an("array");
          response.send.forEach((r) => {
            expect(r).to.be.an("object");
            expect(r).to.have.all.keys(["id", "name"]);
          });
        });
      });
    });
  });
});
