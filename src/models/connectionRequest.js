const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //fromUserId is refering to user collection
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} is incorrect status type",
      },
    },
  },
  { timestamps: true }
);

// compound indexing
// Now, the search query, ConnectionRequest.findOne({fromUserId: iofjwiof, toUserId: kmgiojoi})  -> will be very much fast
connectionRequestSchema.index({fromUserId: 1, toUserId: 1});

// this middleware will be called, whenever we are calling connectionRequest.save() method
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  // check if, fromUserId === toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself");
  }
  next();
});

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
