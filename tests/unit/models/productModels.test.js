const sinon = require("sinon");
const chai = require("chai");

const productModel = require("../../../models/productModel");
const connection = require("../../../helpers/connection");
const { allProductsResponse } = require("../../../__tests__/_dataMock");

const { expect } = chai;
chai.use(require("chai-sorted"));

describe("Get all data from DB", () => {
  before(async () => {
    sinon.stub(connection, "execute").resolves(allProductsResponse);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe("When it is read successfully", () => {
    it("return an array of objects in ascending order", async () => {
      const response = await productModel.getAll();

      expect(response).to.be.an("array");
      response.forEach((r) => {
        expect(r).to.be.an("object");
        expect(r).to.have.all.keys(["id", "name"]);
      });
      expect(response).to.be.ascendingBy("id");
    });
  });
});
