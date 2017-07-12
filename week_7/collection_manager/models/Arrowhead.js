var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var arrowheadSchema = new Schema(
  {
    tribe: {
      type: String,
      required: true,
      default: "unknown"
    },
    shape: {
      type: String,
      required: true,
      enum: [
        "oval",
        "triangle",
        "spade",
        "ellipse",
        "circle",
        "elongated",
        "unknown"
      ],
      default: "unknown"
    },
    material: {
      type: String,
      required: true,
      default: "unknown"
    },
    size: Number,
    sizeUnit: {
      type: String,
      enum: ["IN", "CM", "MM"]
    },
    color: String,
    age: {
      type: Number,
      min: 10,
      max: 1000000
    },
    value: {
      type: Schema.Types.Mixed,
      default: "unknown"
    },
    currency: {
      type: String,
      enum: ["USD", "BP", "CD"]
    },
    foundLocation: {
      country: {
        type: String,
        required: true
      },
      region: String,
      state_province: {
        type: String,
        required: true
      },
      city: String,
      address: String,
      otherData: String
    },
    finders: [String],
    yearFound: {
      type: Number,
      min: 1500,
      max: 2020
    },
    seller: {
      name: String,
      address: {
        country: String,
        state_province: String,
        address: String,
        otherData: String
      },
      website: String
    }
  },
  { strict: false }
);

// name of the collect, and the schema for the collection
arrowheadSchema.virtual("yearMade").get(function() {
  if (!this.yearFound || !this.age) {
    return "unknown";
  }
  return this.yearFound - this.age;
});

arrowheadSchema.methods.shoot = function() {
  console.log(`I was used to make an arrow for ${this.tribe} tribe.`);
};

module.exports = mongoose.model("Arrowhead", arrowheadSchema);
