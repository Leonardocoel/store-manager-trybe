const sinon = require("sinon");
const { expect } = require("chai");

const productsService = require("../../../services/productsService");
const productsModel = require("../../../models/productsModel");
const { allProductsResponse } = require("../../../__tests__/_dataMock");

describe("Products services tests", () => {
  describe("Read tests", () => {
    describe("Require all data", () => {
      describe("When the result is undefined", () => {
        before(async () => {
          sinon.stub(productsModel, "getAll").resolves();
        });

        after(async () => {
          productsModel.getAll.restore();
        });

        it("Verify if the return is null", async () => {
          const response = await productsService.getAll();

          expect(response).is.null;
        });
      });

      describe("When the result is defined", () => {
        before(async () => {
          sinon.stub(productsModel, "getAll").resolves(allProductsResponse);
        });

        after(async () => {
          productsModel.getAll.restore();
        });

        it("Verify if it returns an array of objects", async () => {
          const response = await productsService.getAll();

          expect(response).to.be.an("array");
          response.forEach((r) => {
            expect(r).to.be.an("object");
            expect(r).to.have.all.keys(["id", "name"]);
          });
        });

        it("Verify if array is in ascending order by id", async () => {
          const response = await productsService.getAll();

          expect(response).to.be.ascendingBy("id");
        });
      });
    });

    describe("Request data by id", () => {
      describe("When the id is not valid", () => {
        it("Verify if the id is invalid and returns false", async () => {
          const response = await productsService.getById();

          expect(response).to.be.a("boolean").to.be.false;
        });
      });

      describe("When the result is undefined", () => {
        before(async () => {
          sinon.stub(productsModel, "getById").resolves();
        });

        after(async () => {
          productsModel.getById.restore();
        });

        it("Verify if the return is null", async () => {
          const response = await productsService.getById(2);

          expect(response).is.null;
        });
      });

      describe("When the result is defined", () => {
        before(async () => {
          sinon
            .stub(productsModel, "getById")
            .withArgs(2)
            .resolves(allProductsResponse[1]);
        });

        after(async () => {
          productsModel.getById.restore();
        });

        it("Verify if it returns an object", async () => {
          const response = await productsService.getById(2);

          expect(response).to.be.an("object");
        });

        it("Verify if the object has the correct information", async () => {
          const response = await productsService.getById(2);

          expect(response).to.have.property("id", 2);
          expect(response).to.be.equal(allProductsResponse[1]);
        });
      });
    });
  });
  describe("Create tests", () => {
    describe("Implement new product", () => {
      describe("When inserted with sucess", () => {
        const data = { id: 1, name: "productX" };
        const payload = { name: "productX" };

        before(async () => {
          sinon.stub(productsModel, "create").resolves(data);
        });

        after(async () => {
          productsModel.create.restore();
        });

        it("Validates if it returns an object with the correct information", async () => {
          const response = await productsService.create(payload);

          expect(response).to.be.an("object").that.is.deep.equal(data);
        });
      });
    });
  });
});
