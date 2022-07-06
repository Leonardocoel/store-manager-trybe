const sinon = require("sinon");
const { expect } = require("chai");

const salesModel = require("../../../models/salesModel");
const connection = require("../../../helpers/connection");
const getAllMock = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 2,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];

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
  describe("Database read tests", () => {
    describe("Require all table data", () => {
      before(async () => {
        sinon.stub(connection, "execute").resolves([getAllMock]);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Verify if it returns an array of objects", async () => {
        const response = await salesModel.getAll();

        expect(response).to.be.an("array");
        response.forEach((r) => {
          expect(r).to.be.an("object");
          expect(r).to.have.all.keys([
            "saleId",
            "date",
            "productId",
            "quantity",
          ]);
        });
      });

      it("Verify if array is in ascending order by id", async () => {
        const response = await salesModel.getAll();
        expect(response).to.be.ascendingBy("saleId");
      });
    });
    describe("Request table data by id", () => {
      before(async () => {
        const query = `SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp 
    ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY s.id, sp.product_id`;

        sinon
          .stub(connection, "execute")
          .withArgs(query, [1])
          .resolves([[getAllMock[0]]]);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Verify if it returns an array", async () => {
        const response = await salesModel.getById(1);

        expect(response).to.be.an("array");
      });

      it("Verify if the object has the correct information", async () => {
        const response = await salesModel.getById(1);

        response.forEach((r) => {
          expect(r).to.have.property("saleId", 1);
        });
        expect(response).to.be.eql([getAllMock[0]]);
      });
    });
  });
});
