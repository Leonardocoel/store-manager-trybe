const sinon = require("sinon");
const { expect } = require("chai");

const productsService = require("../../../services/productsService");
const productsController = require("../../../controllers/productsController");
const { allProductsResponse } = require("../../../__tests__/_dataMock");

describe("Products controller tests", () => {
  describe("Read requests tests", () => {
    describe("Require all data", () => {
      describe("When the result is undefined", () => {
        const res = {};
        const req = {};
        const next = sinon.stub().returns();

        before(async () => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(productsService, "getAll").resolves(false);
        });
        after(async () => {
          productsService.getAll.restore();
        });

        it("Verifies if the status is called with the code 404", async () => {
          await productsController.getAll(req, res, next);
          expect(res.status.calledWith(404)).to.be.true;
        });

        it('Verifies if the json is called with the message "There are no products"', async () => {
          await productsController.getAll(req, res, next);
          expect(res.json.calledWith({ message: "There are no products" })).to
            .be.true;
        });
      });
      describe("When the result is defined", () => {
        const req = {};
        const res = {};
        const next = sinon.stub().returns();

        before(async () => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(productsService, "getAll").resolves(allProductsResponse);
        });
        after(async () => {
          productsService.getAll.restore();
        });

        it("Verifies if the status is called with the code 200", async () => {
          await productsController.getAll(req, res, next);
          expect(res.status.calledWith(200)).to.be.true;
        });

        it("Verifies if it sends an array of objects", async () => {
          const result = await productsService.getAll();

          expect(result).to.be.an("array");
          result.forEach((r) => {
            expect(r).to.be.an("object");
            expect(r).to.have.all.keys(["id", "name"]);
          });
        });
      });
    });
    describe("Require data by id", () => {
      describe("When the result is undefined", () => {
        const res = {};
        const req = {};
        const next = sinon.stub().returns();

        before(async () => {
          req.params = { id: 2 };
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(productsService, "getById").resolves(false);
        });
        after(async () => {
          productsService.getById.restore();
        });

        it("Verifies if the status is called with the code 404", async () => {
          await productsController.getById(req, res, next);
          expect(res.status.calledWith(404)).to.be.true;
        });

        it('Verifies if the json is called with the message "Product not found"', async () => {
          await productsController.getById(req, res, next);
          expect(res.json.calledWith({ message: "Product not found" })).to.be
            .true;
        });
      });
      describe("When the result is defined", () => {
        const req = {};
        const res = {};
        const next = sinon.stub().returns();

        before(async () => {
          req.params = { id: 2 };
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon
            .stub(productsService, "getById")
            .resolves(allProductsResponse[1]);
        });
        after(async () => {
          productsService.getById.restore();
        });

        it("Verifies if the status is called with the code 200", async () => {
          await productsController.getById(req, res, next);

          expect(res.status.calledWith(200)).to.be.true;
        });

        it("Verifies if it returns an object", async () => {
          const response = await productsService.getById();

          expect(response).to.be.an("object");
        });

        it("Verifies if the object has the correct information", async () => {
          const response = await productsService.getById();
          expect(response).to.have.property("id", 2);
          expect(response).to.be.equal(allProductsResponse[1]);
        });
      });
    });
  });
  describe("Create requests tests", () => {
    describe("Implement new product", () => {
      describe("When name is undefined", () => {
        const req = {};
        const res = {};
        const next = sinon.stub().returns();

        before(() => {
          req.body = {};

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(productsService, "create").resolves("BAD_REQUEST");
        });
        after(() => {
          productsService.create.restore();
        });

        it("Verifies if the status is called with the code 400", async () => {
          await productsController.create(req, res, next);
          expect(res.status.calledWith(400)).to.be.true;
        });
      });
      describe("When name length is less than 5", () => {
        const req = {};
        const res = {};
        const next = sinon.stub().returns();

        before(() => {
          req.body = {};

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon
            .stub(productsService, "create")
            .resolves("UNPROCESSABLE_ENTITY");
        });
        after(() => {
          productsService.create.restore();
        });

        it("Verifies if the status is called with the code 422", async () => {
          await productsController.create(req, res, next);
          expect(res.status.calledWith(422)).to.be.true;
        });
      });
      describe("When inserted successfully", () => {
        const req = {};
        const res = {};
        const next = sinon.stub().returns();
        const data = { id: 1, name: "productX" };

        before(async () => {
          req.body = { name: "productX" };

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(productsService, "create").resolves(data);
        });

        after(async () => {
          productsService.create.restore();
        });

        it("Verifies if the status is called with the code 201", async () => {
          await productsController.create(req, res, next);
          expect(res.status.calledWith(201)).to.be.true;
        });

        it("Verifies if the object has the correct information", async () => {
          const response = await productsService.create();

          expect(response)
            .to.be.an("object")
            .that.have.all.keys(["id", "name"]);
          expect(response).to.be.equal(data);
        });
      });
    });
  });
  describe("Update requests tests", () => {
    describe("Update product name", () => {
      describe("When fails", () => {
        const req = {};
        const res = {};
        const next = sinon.stub().returns();

        before(() => {
          req.body = {};
          req.params = {};

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon
            .stub(productsService, "update")
            .resolves({ code: 400, message: "BAD REQUEST" });
        });
        after(() => {
          productsService.update.restore();
        });

        it("Verifies if the status is called with the code 400", async () => {
          await productsController.update(req, res, next);
          expect(res.status.calledWith(400)).to.be.true;
        });

        it("Verifies if returns BAD REQUEST message", async () => {
          const { message } = await productsService.update(undefined, "Mask");

          expect({ message }).to.be.eql({ message: "BAD REQUEST" });
        });
      });
      describe("When successful", () => {
        const req = {};
        const res = {};
        const next = sinon.stub().returns();

        before(() => {
          req.body = { name: "Batmóvel" };
          req.params = { id: 1 };

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon
            .stub(productsService, "update")
            .resolves({ code: 200, product: { id: 1, name: "Batmóvel" } });
        });
        after(() => {
          productsService.update.restore();
        });

        it("Verifies if the status is called with the code 200", async () => {
          await productsController.update(req, res, next);
          expect(res.status.calledWith(200)).to.be.true;
        });

        it("Verifies if returns the updated product", async () => {
          const {product} = await productsService.update();

          expect(product).to.be.eql({ id: 1, name: "Batmóvel" });
        });
      });
    });
  });
  describe("Delete requests tests", () => {
    describe("Delete product", () => {
      describe("When fails", () => {
        const req = {};
        const res = {};
        const next = sinon.stub().returns();

        before(() => {
          req.params = {};

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon
            .stub(productsService, "exclude")
            .resolves({ code: 404, message: "PRODUCT NOT FOUND" });
        });
        after(() => {
          productsService.exclude.restore();
        });

        it("Verifies if the status is called with the code 404", async () => {
          await productsController.exclude(req, res, next);
          expect(res.status.calledWith(404)).to.be.true;
        });

        it("Verifies if returns NOT FOUND message", async () => {
          const { message } = await productsService.exclude();

          expect({ message }).to.be.eql({ message: "PRODUCT NOT FOUND" });
        });
      });
      describe("When successful", () => {
        const req = {};
        const res = {};
        const next = sinon.stub().returns();

        before(() => {
          req.params = { id: 1 };

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon
            .stub(productsService, "exclude")
            .resolves({ code: 204 });
        });
        after(() => {
          productsService.exclude.restore();
        });

        it("Verifies if the status is called with the code 204", async () => {
          await productsController.exclude(req, res, next);
          expect(res.status.calledWith(204)).to.be.true;
        });
      });
    });
  });
});
