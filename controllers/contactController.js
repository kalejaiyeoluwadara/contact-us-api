const { validationResult } = require("express-validator");
const { sendContactEmails } = require("../helpers/emailHelper");

const submitContact = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { firstName, email, message } = req.body;

    // Send emails
    const emailResults = await sendContactEmails(firstName, email, message);

    if (emailResults.success) {
      res.status(200).json({
        success: true,
        message:
          "Contact form submitted successfully. We will get back to you soon!",
        data: {
          firstName,
          email,
          submittedAt: new Date().toISOString(),
        },
      });
    } else {
      console.error("Email sending failed:", emailResults.error);
      res.status(500).json({
        success: false,
        message: "Failed to send contact form. Please try again later.",
        error:
          process.env.NODE_ENV === "development"
            ? emailResults.error
            : undefined,
      });
    }
  } catch (error) {
    console.error("Contact controller error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  submitContact,
};
