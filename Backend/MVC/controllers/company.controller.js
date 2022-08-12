let company = require("../models/company.model");

/**************multer****** */
const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: (re, file, cb) => {
    cb(null, "./public/campanyLogos");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

module.exports.imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});
/****************************/
//get All Companies
module.exports.getAllComapny = (req, res, next) => {
  company
    .find({}, { password: 0 })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

//get one puplic
module.exports.getCampanyByIdPuplic = (req, res, next) => {
  company
    .findOne(
      {
        _id: req.params.id,
      },
      { password: 0, wallet: 0, isBlocked: 0 }
    )
    .then((data) => {
      if (data == null) next(new Error("company not found"));
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

//get one privte check id

module.exports.getCampanyByIdPrivate = (req, res, next) => {
  company
    .findOne(
      {
        _id: req.params.id,
      },
      { password: 0, isBlocked: 0 }
    )
    .then((data) => {
      if (data == null) next(new Error("company not found"));
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

//update detaials
module.exports.updateCompanyDetails = (req, res, next) => {
  console.log(req.file);
  company
    .findOne({
      _id: req.params.id,
    })
    .then((data) => {
      console.log(req.body);

      for (let item in req.body) {
        console.log(item);
        if (item == "location") {
          for (let nestedItem in req.body[item]) {
            console.log(nestedItem);
            if (
              ["postalCode", "city", "address", "state"].includes(nestedItem)
            ) {
              // data["location"][nestedItem] = req.body["location"][nestedItem];
              data["location"][nestedItem] = req.body["location"][nestedItem];
            }
          }
        } else data[item] = req.body[item] || data[item];
      }
      let logoPath = "";
      if (req.file) {
        logoPath = req.file.path;
      } else {
        logoPath = "./public/uploads/default.jpg"; //image
      }
      data.logo = logoPath;
      data.save();
      res.status(200).json({ data });
      return data;
    })

    .catch((error) => {
      next(error);
    });
};

// other function isblocked ,wallet , analytics, isverfiied
module.exports.updateCompanyInfo = (req, res, next) => {
  const backInfo = ["analytics", "isVerified", "isBlocked", "wallet"];
  company
    .findById(req.params.id)
    .then((data) => {
      if (!data) throw new Error("company not found");
      for (let item in req.body) {
        if (item == "analytics") {
          for (let nestedItem in req.body[item]) {
            if (["earnings", "jobs", "hours", "views"].includes(nestedItem)) {
              data["analytics"][nestedItem] = req.body["analytics"][nestedItem];
            }
          }
        } else data[item] = req.body[item] || data[item];
      }
      return data.save();
    })
    .then((data) => {
      res.status(201).json({ data });
    })
    .catch((error) => next(error));
};

//delete one company
module.exports.deleteCompany = (req, res, next) => {
  company
    .deleteOne({
      _id: req.params.id,
    })
    .then((data) => {
      res.status(200).json({
        data: "deleted",
      });
    })
    .catch((error) => next(error));
};

//Testimonials

module.exports.CompanyupdateTestimonials = (req, res, next) => {
  company
    .findById(req.params.id)
    .then((data) => {
      if (!data) throw new Error("Company not found!");

      let TestimonialObject = {};
      console.log(TestimonialObject);
      for (let key in req.body) {
        TestimonialObject[key] = req.body[key];
        console.log(TestimonialObject);
      }
      data.testimonials.push(TestimonialObject);
      data.projects.push(req.body.project);
      return data.save();
    })
    .then((data) => {
      res.status(201).json({ data: "updated" });
    })
    .catch((error) => next(error));
};
