import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.fullName || !data.phoneNumber || !data.address || !data.fixtureName) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Create email content
    const emailSubject = `New Quote Request - ${data.fixtureName}`

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background-color: #000; color: #fbbf24; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .section { margin-bottom: 20px; padding: 15px; background-color: white; border-radius: 8px; border-left: 4px solid #fbbf24; }
            .label { font-weight: bold; color: #000; }
            .value { margin-left: 10px; }
            .footer { background-color: #000; color: #fbbf24; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Campbell's Plumbing - New Quote Request</h1>
          </div>
          
          <div class="content">
            <div class="section">
              <h2 style="color: #000; border-bottom: 2px solid #fbbf24; padding-bottom: 10px;">Customer Information</h2>
              <p><span class="label">Name:</span><span class="value">${data.fullName}</span></p>
              <p><span class="label">Phone:</span><span class="value">${data.phoneNumber}</span></p>
              <p><span class="label">Address:</span><span class="value">${data.address}</span></p>
            </div>
            
            <div class="section">
              <h2 style="color: #000; border-bottom: 2px solid #fbbf24; padding-bottom: 10px;">Fixture Details</h2>
              <p><span class="label">Product:</span><span class="value">${data.fixtureName}</span></p>
              <p><span class="label">Category:</span><span class="value">${data.category}</span></p>
              <p><span class="label">Option Selected:</span><span class="value">${data.priceOption.charAt(0).toUpperCase() + data.priceOption.slice(1)}</span></p>
              <p><span class="label">Price Range:</span><span class="value">${data.priceRange}</span></p>
            </div>
            
            <div class="section">
              <h2 style="color: #000; border-bottom: 2px solid #fbbf24; padding-bottom: 10px;">Request Details</h2>
              <p><span class="label">Submitted:</span><span class="value">${new Date().toLocaleString("en-US", {
                timeZone: "America/Los_Angeles",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })} PST</span></p>
              <p><span class="label">Source:</span><span class="value">Campbell's Plumbing Website</span></p>
            </div>
          </div>
          
          <div class="footer">
            <p>Campbell's Plumbing - Professional Plumbing Services</p>
            <p>This quote request was submitted through your website fixture catalog.</p>
          </div>
        </body>
      </html>
    `

    const emailText = `
Campbell's Plumbing - New Quote Request

Customer Information:
- Name: ${data.fullName}
- Phone: ${data.phoneNumber}
- Address: ${data.address}

Fixture Details:
- Product: ${data.fixtureName}
- Category: ${data.category}
- Option Selected: ${data.priceOption.charAt(0).toUpperCase() + data.priceOption.slice(1)}
- Price Range: ${data.priceRange}

Request Details:
- Submitted: ${new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })} PST
- Source: Campbell's Plumbing Website

Please follow up with this customer within 24 hours.
    `

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "Campbell's Plumbing <quotes@campbellsplumbing.com>",
      to: ["campbellsplumbing777@gmail.com"],
      subject: emailSubject,
      html: emailHtml,
      text: emailText,
      replyTo: data.phoneNumber ? `${data.fullName} <noreply@campbellsplumbing.com>` : undefined,
    })

    console.log("Email sent successfully:", emailResponse)

    // Log the quote request for your records
    console.log("Quote request processed:", {
      id: emailResponse.data?.id,
      customerInfo: {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        address: data.address,
      },
      fixtureDetails: {
        fixtureName: data.fixtureName,
        priceOption: data.priceOption,
        priceRange: data.priceRange,
        category: data.category,
      },
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Quote request sent successfully",
      emailId: emailResponse.data?.id,
    })
  } catch (error) {
    console.error("Error processing quote request:", error)

    // Return different error messages based on the error type
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return NextResponse.json({ success: false, message: "Email service configuration error" }, { status: 500 })
      }
      if (error.message.includes("rate limit")) {
        return NextResponse.json(
          { success: false, message: "Too many requests. Please try again later." },
          { status: 429 },
        )
      }
    }

    return NextResponse.json(
      { success: false, message: "Error sending quote request. Please try again." },
      { status: 500 },
    )
  }
}
