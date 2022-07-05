const sinon = require("sinon");
const { expect } = require("chai");

const salesProductsModel = require("../../../models/salesProductsModel");
const connection = require("../../../helpers/connection");

describe("SalesProducts model tests", () => {
  describe("Database create tests", () => {
    describe("Insert sales in the database", () => {
      it("Verifies if the function is called with the correct parameters", async () => {
        const spy = sinon.stub(connection, "execute");

        await salesProductsModel.create(1, 2, 3);
        spy.restore();
        expect(spy.calledOnce).to.be.true;
      });
    });
  });
});
