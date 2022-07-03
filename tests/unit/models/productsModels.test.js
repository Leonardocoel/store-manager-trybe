const sinon = require("sinon");
const chai = require("chai");

const productsModel = require("../../../models/productsModel");
const connection = require("../../../helpers/connection");
const { allProductsResponse } = require("../../../__tests__/_dataMock");

const { expect } = chai;
chai.use(require("chai-sorted"));

describe("Products model tests", () => {
  describe("Database read tests", () => {
    describe("Require all table data", () => {
      before(async () => {
        sinon.stub(connection, "execute").resolves([allProductsResponse]);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Verify if it returns an array of objects", async () => {
        const response = await productsModel.getAll();

        expect(response).to.be.an("array");
        response.forEach((r) => {
          expect(r).to.be.an("object");
          expect(r).to.have.all.keys(["id", "name"]);
        });
      });

      it("Verify if array is in ascending order by id", async () => {
        const response = await productsModel.getAll();
        expect(response).to.be.ascendingBy("id");
      });
    });
    describe("Request table data by id", () => {
      before(async () => {
        const select = `SELECT * FROM StoreManager.products\n    WHERE id = ?`;

        sinon
          .stub(connection, "execute")
          .withArgs(select, [2])
          .resolves([[allProductsResponse[1]]]);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Verify if it returns an object", async () => {
        const response = await productsModel.getById(2);

        expect(response).to.be.an("object");
      });

      it("Verify if the object has the correct information", async () => {
        const response = await productsModel.getById(2);

        expect(response).to.have.property("id", 2);
        expect(response).to.be.equal(allProductsResponse[1]);
      });
    });
  });
  describe('Database create tests', () => {
    describe('Insert a new product in the database', () => {
      const payload = {
        name: 'productX'
      }
      before(async () => {
        const execute = [{ insertId: 1 }];

        sinon.stub(connection, 'execute').resolves(execute)
      })
      after(async () => {
        connection.execute.restore();
      })
      it('Validates if it returns an object with the correct id', async () => {
        const response = await productsModel.create(payload);

        expect(response).to.be.an('object').that.have.property('id', 1);
      })

    })
  })
});
