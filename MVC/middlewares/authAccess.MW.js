/** Individuals
 */

const adminAuth = (req, res, next) => {
  if (req.role == "admin") {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

const clientAuth = (req, res, next) => {
  if (req.role == "client") {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

const freelancerAuth = (req, res, next) => {
  if (req.role == "freelancer") {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

const companyAuth = (req, res, next) => {
  if (req.role == "company") {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

/** Combination
 */

const clientAndCompanyAuth = (req, res, next) => {
  if (req.role == "client" || req.role == "company") {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

const AdminAndFreelancerAuth = (req, res, next) => {
  if (["admin", "freelancer"].includes(req.role)) {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

const AdminAndClientAuth = (req, res, next) => {
  if (["admin", "client"].includes(req.role)) {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

const AdminAndClientAndCompanyAuth = (req, res, next) => {
  if (["admin", "client", "company"].includes(req.role)) {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

const AdminAndClientAndFreelancerAuth = (req, res, next) => {
  if (["admin", "client", "freelancer"].includes(req.role)) {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

const allAuth = (req, res, next) => {
  if (["admin", "client", "freelancer", "company"].includes(req.role)) {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

module.exports = {
  adminAuth,
  clientAuth,
  freelancerAuth,
  companyAuth,
  clientAndCompanyAuth,
  AdminAndFreelancerAuth,
  AdminAndClientAuth,
  AdminAndClientAndCompanyAuth,
  AdminAndClientAndFreelancerAuth,
  allAuth,
};
