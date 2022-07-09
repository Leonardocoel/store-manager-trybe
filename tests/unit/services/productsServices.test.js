const sinon = require("sinon");
const { expect } = require("chai");

const productsService = require("../../../services/productsService");
const productsModel = require("../../../models/productsModel");
const { ERROR_MESSAGE } = require("../../../helpers/httpStatusCode");
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
      describe("When fails validation", () => {
        before(async () => {
          sinon.stub(productsModel, "create").resolves(undefined);
        });

        after(async () => {
          productsModel.create.restore();
        });

        it("Verifies when name does not exist", async () => {
          const response = await productsService.create();

          expect(response).to.be.equal("BAD_REQUEST");
        });

        it("Verifies when name length is less than 5", async () => {
          const payload = "Mask";
          const response = await productsService.create(payload);

          expect(response).to.be.eql("UNPROCESSABLE_ENTITY");
        });
      });
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
  describe("Update tests", () => {
    describe("Change product name", () => {
      describe("When fails validation", () => {
        before(async () => {
          sinon.stub(productsModel, "update").resolves(0);
        });

        after(async () => {
          productsModel.update.restore();
        });

        it("Verifies when name does not exist", async () => {
          const response = await productsService.update(1);

          expect(response).to.be.eql({
            code: 400,
            message: '"name" is required',
          });
        });

        it("Verifies when name length is less than 5", async () => {
          const response = await productsService.update(1, "Mask");

          expect(response).to.be.eql({
            code: 422,
            message: '"name" length must be at least 5 characters long',
          });
        });

        it("Verifies when id does not exist", async () => {
          const response = await productsService.update(undefined, "Batmóvel");

          expect(response).to.be.eql({
            code: 400,
            message: '"id" is required',
          });
        });

        it("Verifies when product does not exist", async () => {
          const response = await productsService.update(10, "Batmóvel");

          expect(response).to.be.eql({
            code: 404,
            message: "Product not found",
          });
        });
      });
      describe("When updated with sucess", () => {
        before(async () => {
          sinon.stub(productsModel, "update").resolves(1);
        });

        after(async () => {
          productsModel.update.restore();
        });

        it("Validates if it returns 1", async () => {
          const result = { id: 1, name: "Batmóvel" };
          const response = await productsService.update(1, "Batmóvel");

          expect(response).to.be.eql({ code: 200, product: result });
        });
      });
    });
  });
  describe("Delete tests", () => {
    describe("Exclude product", () => {
      describe("When fails to exclude", () => {
        before(async () => {
          sinon.stub(productsModel, "exclude").resolves(0);
        });

        after(async () => {
          productsModel.exclude.restore();
        });

        it("Verifies when product does not exist", async () => {
          const response = await productsService.exclude(10, "Batmóvel");

          expect(response).to.be.eql({
            code: 404,
            message: "Product not found",
          });
        });
      });
      describe("When excluded with sucess", () => {
        before(async () => {
          sinon.stub(productsModel, "exclude").resolves(1);
        });

        after(async () => {
          productsModel.exclude.restore();
        });

        it("Validates if it returns 1", async () => {
          const response = await productsService.exclude(1, "Batmóvel");

          expect(response).to.be.eql({ code: 204 });
        });
      });
    });
  });
});
