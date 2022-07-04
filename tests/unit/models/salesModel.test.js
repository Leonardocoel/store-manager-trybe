const sinon = require("sinon");
const { expect } = require("chai");

const salesModel = require("../../../models/salesModel");
const connection = require("../../../helpers/connection");

describe("Sales model tests", () => {
  describe("Database create tests", () => {
    describe("Insert sales in the database", () => {
      before(async () => {
        const execute = [{ insertId: 1 }];

        sinon.stub(connection, "execute").resolves(execute);
      });
      after(async () => {
        connection.execute.restore();
      });
      it("Validates if it returns an object with the correct id", async () => {
        const response = await salesModel.create();

        expect(response).to.be.an("object").that.have.property("id", 1);
      });
    });
  });
});
