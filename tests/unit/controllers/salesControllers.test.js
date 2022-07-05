const sinon = require("sinon");
const { expect } = require("chai");

const salesService = require("../../../services/salesService");
const salesController = require("../../../controllers/salesController");
const {
  rightSaleBody,
  saleCreateResponse,
} = require("../../../__tests__/_dataMock");

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
          salesService.create.restore()
        });

        it('Status is called with the code 201', async () => {
          await salesController.create(req, res, next);
          expect(res.status.calledWith(201)).to.be.true;
        })
        
        it("Object has the correct properties", async () => {
          const response = await salesService.create();

          expect(response).to.be.an("object");
          expect(response).to.have.all.keys(["code", "sale"]);
          expect(response.sale).to.have.all.keys(["id", "itemsSold"]);
        });
        it
      });
    });
  });
});
