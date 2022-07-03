const sinon = require("sinon");
const chai = require("chai");

const productsModel = require("../../../models/productsModel");
const connection = require("../../../helpers/connection");
const { allProductsResponse } = require("../../../__tests__/_dataMock");
const { beforeEach } = require("mocha");
const { assert } = require("joi");

const { expect } = chai;
chai.use(require("chai-sorted"));

describe("Products model tests", () => {
  describe("Get all data from DB", () => {
    before(async () => {
      sinon.stub(connection, "execute").resolves([allProductsResponse]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("the returned data is an array of objects", async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.an("array");
      response.forEach((r) => {
        expect(r).to.be.an("object");
        expect(r).to.have.all.keys(["id", "name"]);
      });
    });
    it("the returned array is in ascending order by id", async () => {
      const response = await productsModel.getAll();
      expect(response).to.be.ascendingBy("id");
    });
  });

  describe("Get data by id from DB", () => {
    before(async () => {
      const select = `SELECT * FROM StoreManager.products\n    WHERE id = ?`;
      sinon
        .stub(connection, "execute")
        .withArgs(select, [2])
        .resolves([allProductsResponse[1]]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it("return an object", async () => {
      const response = await productsModel.getById(2);

      expect(response).to.be.an("object");
    });

    it("verify if object id is correct", async () => {
      const response = await productsModel.getById(2);

      expect(response).to.have.property("id", 2);
      expect(response).to.be.equal(allProductsResponse[1]);
    });
  });
});
