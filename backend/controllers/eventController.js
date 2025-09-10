import Events from "../models/eventModel.js";
import Shop from "../models/ShopModel.js";
import fs from "fs";

export async function createEvent(req, res) {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop)
      return res.status(400).json({ message: "ShopId for event is invalid!" });
    else {
      const files = req.files;
      const imgUrls = files.map(file => `${file.filename}`);
      const eventData = req.body;
      eventData.images = imgUrls;
      eventData.shop = shop;

      const event = await Events.create(eventData);
      res.status(201).json({ success: true, event });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllEventsShop(req, res) {
  try {
    const events = await Events.find({ shopId: req.params.id });
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteEvent(req, res) {
  try {
    const productId = req.params.id;

    const eventsData = await Events.findById(productId);

    eventsData.images.forEach(imgUrl => {
      const filename = imgUrl;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, error => {
        if (error) {
          console.log(error);
        }
      });
    });

    const event = await Events.findByIdAndDelete(productId);
    if (!event)
      return res
        .status(500)
        .json({ success: false, message: "Event not found with this id!" });
    res.status(201).json({
      success: true,
      message: "Event Deleted Successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllEvents(req, res) {
  try {
    const events = await Events.find();
    res.status(201).json({ success: true, events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function getAllEventsAdmin(req, res) {
  try {
    const events = await Events.find().sort({ createdAt: -1 });
    res.status(201).json({ success: true, events });
  } catch (error) {
    console.error(error);
  }
}
