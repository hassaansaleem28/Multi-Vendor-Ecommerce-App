import cloudinary from "../config/cloudinary.js";
import Events from "../models/eventModel.js";
import Shop from "../models/ShopModel.js";
import fs from "fs";

export async function createEvent(req, res) {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop)
      return res.status(400).json({ message: "ShopId for event is invalid!" });

    const files = req.files;
    const imgData = files.map(file => ({
      public_id: file.filename.split(".")[0],
      url: file.path,
    }));
    const eventData = {
      ...req.body,
      images: imgData,
      shop: shop._id,
    };

    const event = await Events.create(eventData);
    res.status(201).json({ success: true, event });
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
    const eventId = req.params.id;
    const eventsData = await Events.findById(eventId);

    if (!eventsData) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found with this id!" });
    }

    const deletionPromises = eventsData.images.map(img =>
      cloudinary.uploader.destroy(`ecommerce_uploads/${img.public_id}`)
    );

    await Promise.all(deletionPromises);
    await Events.findByIdAndDelete(eventId);

    res.status(200).json({
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
