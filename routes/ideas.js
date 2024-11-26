const express = require("express");
const router = express.Router();
const Idea = require("../models/idea");

// GET method
router.get("/", async (request, response) => {
  try {
    const idea = await Idea.find();
    response.send({ status: 200, data: idea });
  } catch (error) {
    response.send({ status: 500, error: "Something went wrong" });
  }
});

// GET method single object
router.get("/:id", async (request, response) => {
  const ideas = await Idea.find();

  const idea = ideas.find(
    (ele) => ideas.indexOf(ele) + 1 === +request.params.id
  );
  try {
    if (!idea) {
      return response.status(404).send({
        status: 404,
        data: "NOT FOUNDED",
      });
    }
    response.status(200).send({
      status: 200,
      data: idea,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      status: 404,
      data: "NOT FOUNDED",
    });
  }
});

// POST method
router.post("/", async (request, response) => {
  const idea = new Idea({
    text: request.body.text,
    tag: request.body.tag,
    username: request.body.username,
  });

  try {
    const ideaID = await idea.save();
    response.send({ status: 201, data: ideaID });
  } catch (error) {
    console.log(error);
    response.send({ status: 500, data: "something went wrong" });
  }
});

// PUT method
router.put("/:id", async (request, response) => {
  try {
    const idea = await Idea.findById(request.params.id);

    if (idea.username === request.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        request.params.id,
        {
          $set: {
            text: request.body.text,
            tag: request.body.tag,
          },
        },
        { new: true }
      );
      return response.send({ status: 200, data: updatedIdea });
    }
    response.send({ status: 403, data: "data is not field full" });
  } catch (error) {
    response.send({ status: 404, data: "Something went wrong" });
  }
});

// // DELETE method and DELETE ALL DATA (deleteAll)
router.delete("/:id", async (request, response) => {
  try {
    const idea = await Idea.findById(request.params.id);
    if (idea.username.trim() === request.body.username.trim()) {
      await Idea.findByIdAndDelete(request.params.id);
      return response.send({ status: 200, Delelted: request.params.id });
    }
    response.status(403).send({ status: 403, data: "status not right" });
  } catch (error) {
    console.log(error);
    response.send({ status: 403, error: "Person not valide" });
  }
});

module.exports = router;
