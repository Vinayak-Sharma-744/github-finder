const Joi = require('@hapi/joi');
const string = require('@hapi/joi/lib/types/string');
const express = require('express');

function errorMessage (res, error) {
  console.log("validation error ", error)
  return res.status(402).send({
    status: false,
    message: error.message || error,
    data: null,
  });
}

const userSchema = Joi.object({
  username: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

exports.validateUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  const {error} = userSchema.validate(req.body);
  if(error) return errorMessage(res, error);
  next();
}

const searchSchema = Joi.object({
  search: Joi.array().items(
    Joi.string().optional()
  )
});

exports.validateSearch = (req, res, next) => {
  const { search } = req.body;
  console.log(search);
  const {error} = searchSchema.validate(req.body);
  if(error) return errorMessage(res, error);
  next();
}



