const sinon = require("sinon");
const { expect } = require("chai");

const salesService = require("../../../services/salesService");
const salesController = require("../../../controllers/salesController");
const {
  rightSaleBody,
  saleCreateResponse,
} = require("../../../__tests__/_dataMock");
const getAllMock = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];

describe("Sales Controller tests:", () => {
  describe("CREATE", () => {
    describe("New sale", () => {
      describe("If sucessful", () => {
        const req = {};
        const res = {};
        const next = sinon.stub().returns();

        before(() => {
          req.body = rightSaleBody;
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon
            .stub(salesService, "create")
            .resolves({ code: 201, sale: saleCreateResponse });
        });

        after(() => {
          salesService.create.restore();
        });

        it("Status is called with the code 201", async () => {
          await salesController.create(req, res, next);
          expect(res.status.calledWith(201)).to.be.true;
        });

        it("Object has the correct properties", async () => {
          const response = await salesService.create();

          expect(response).to.be.an("object");
          expect(response).to.have.all.keys(["code", "sale"]);
          expect(response.sale).to.have.all.keys(["id", "itemsSold"]);
        });
      });
      describe("If fails", () => {
        const req = {};
        const res = {};
        const next = sinon.stub().returns();

        before(() => {
          req.body = {};
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon
            .stub(salesService, "create")
            .resolves({ code: 400, message: "error message" });
        });

        after(() => {
          salesService.create.restore();
        });

        it("Status is called with the code 400", async () => {
          await salesController.create(req, res, next);
          expect(res.status.calledWith(400)).to.be.true;
        });

        it("Object has the correct message", async () => {
          const response = await salesService.create();

          expect(response).to.be.an("object");
          expect(response).to.have.all.keys(["code", "message"]);
          expect(response.message).to.be.eql("error message");
        });
      });
    });
    describe("READ", () => {
      describe("All", () => {
        describe("If sucessful", () => {
          const req = {};
          const res = {};
          const next = sinon.stub().returns();

          before(() => {
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            sinon
              .stub(salesService, "getAll")
              .resolves({ code: 200, sale: getAllMock });
          });

          after(() => {
            salesService.getAll.restore();
          });

          it("Status is called with the code 200", async () => {
            await salesController.getAll(req, res, next);
            expect(res.status.calledWith(200)).to.be.true;
          });

          it("Object has the correct properties", async () => {
            const response = await salesService.getAll();

            expect(response).to.be.an("object");
            expect(response).to.have.all.keys(["code", "sale"]);
            expect(response.sale).to.be.eql(getAllMock);
          });
        });
        describe("If fails", () => {
          const req = {};
          const res = {};
          const next = sinon.stub().returns();

          before(() => {
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            sinon
              .stub(salesService, "getAll")
              .resolves({ code: 404, message: "error message" });
          });

          after(() => {
            salesService.getAll.restore();
          });

          it("Status is called with the code 404", async () => {
            await salesController.getAll(req, res, next);
            expect(res.status.calledWith(404)).to.be.true;
          });

          it("Object has the correct message", async () => {
            const response = await salesService.getAll();

            expect(response).to.be.an("object");
            expect(response).to.have.all.keys(["code", "message"]);
            expect(response.message).to.be.eql("error message");
          });
        });
      });
      describe("ById", () => {
        describe("If sucessful", () => {
          const req = {};
          const res = {};
          const next = sinon.stub().returns();

          before(() => {
            req.params = 1;
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            sinon
              .stub(salesService, "getById")
              .resolves({ code: 200, sale: getAllMock });
          });

          after(() => {
            salesService.getById.restore();
          });

          it("Status is called with the code 200", async () => {
            await salesController.getById(req, res, next);
            expect(res.status.calledWith(200)).to.be.true;
          });

          it("Object has the correct properties", async () => {
            const response = await salesService.getById();

            expect(response).to.be.an("object");
            expect(response).to.have.all.keys(["code", "sale"]);
            expect(response.sale).to.be.eql(getAllMock);
          });
        });
        describe("If fails", () => {
          const req = {};
          const res = {};
          const next = sinon.stub().returns();

          before(() => {
            req.params = 7
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            sinon
              .stub(salesService, "getById")
              .resolves({ code: 404, message: "error message" });
          });

          after(() => {
            salesService.getById.restore();
          });

          it("Status is called with the code 404", async () => {
            await salesController.getById(req, res, next);

            expect(res.status.calledWith(404)).to.be.true;
          });

          it("Object has the correct message", async () => {
            const response = await salesService.getById();

            expect(response).to.be.an("object");
            expect(response).to.have.all.keys(["code", "message"]);
            expect(response.message).to.be.eql("error message");
          });
        });
      });
    });
  });
});
