import { NextResponse } from "next/server";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Handle preflight request
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Interface for crop recommendations
interface CropRecommendation {
  name: string;
  profit: number;
  yield: number;
  reason: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { soil, water, land, temperature, rainfall } = body;

    if (!soil || !water || !land) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Final output array
    const crops: CropRecommendation[] = [];

    /** --------------------------  
     *  SOIL-BASED LOGIC  
     * -------------------------- **/
    if (soil.includes("काली") || soil.includes("black")) {
      crops.push(
        {
          name: "कपास (Cotton)",
          profit: 45000,
          yield: 850,
          reason: "काली मिट्टी कपास उत्पादन के लिए सबसे उपयुक्त होती है।",
        },
        {
          name: "सोयाबीन (Soybean)",
          profit: 40000,
          yield: 920,
          reason: "काली मिट्टी में नमी अच्छी रहती है, जो सोयाबीन के लिए उपयोगी है।",
        }
      );
    } else if (soil.includes("दोमट") || soil.includes("loamy")) {
      crops.push(
        {
          name: "गेहूं (Wheat)",
          profit: 55000,
          yield: 1250,
          reason: "दोमट मिट्टी गेहूं उत्पादन के लिए सबसे अच्छी मानी जाती है।",
        },
        {
          name: "चावल (Rice)",
          profit: 65000,
          yield: 1400,
          reason: "दोमट मिट्टी पानी रोक कर रखती है, चावल के लिए उपयोगी।",
        }
      );
    } else if (soil.includes("रेतीली") || soil.includes("sandy")) {
      crops.push(
        {
          name: "मूंगफली (Groundnut)",
          profit: 38000,
          yield: 600,
          reason: "रेतीली मिट्टी में मूंगफली अच्छा उत्पादन देती है।",
        },
        {
          name: "तिल (Sesame)",
          profit: 32000,
          yield: 500,
          reason: "तिल कम उपजाऊ मिट्टी में भी अच्छी पैदावार देता है।",
        }
      );
    }

    /** --------------------------  
     *  WATER-BASED LOGIC  
     * -------------------------- **/
    if (water === "कम") {
      crops.push({
        name: "बाजरा (Millet)",
        profit: 27000,
        yield: 450,
        reason: "कम पानी में भी अच्छी पैदावार।",
      });
    } else if (water === "मध्यम") {
      crops.push({
        name: "चना (Gram)",
        profit: 35000,
        yield: 700,
        reason: "मध्यम पानी में सफल उत्पादन।",
      });
    } else if (water === "ज्यादा") {
      crops.push({
        name: "धान (Paddy)",
        profit: 70000,
        yield: 1500,
        reason: "अधिक पानी में धान सबसे अच्छा।",
      });
    }

    /** --------------------------  
     *  TEMPERATURE LOGIC  
     * -------------------------- **/
    if (temperature) {
      const temp = parseFloat(temperature);

      if (temp > 32) {
        crops.push({
          name: "ज्वार (Sorghum)",
          profit: 30000,
          yield: 600,
          reason: "उच्च तापमान में अच्छी पैदावार देता है।",
        });
      } else if (temp < 18) {
        crops.push({
          name: "आलू (Potato)",
          profit: 48000,
          yield: 1100,
          reason: "कम तापमान आलू के लिए बेहतर।",
        });
      }
    }

    /** --------------------------  
     *  RAINFALL LOGIC  
     * -------------------------- **/
    if (rainfall) {
      const rain = parseFloat(rainfall);

      if (rain > 1000) {
        crops.push({
          name: "चाय (Tea)",
          profit: 150000,
          yield: 500,
          reason: "अधिक वर्षा वाले क्षेत्रों में चाय लाभदायक।",
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        recommendations:
          crops.length > 0
            ? crops
            : [
                {
                  name: "कोई उपयुक्त फसल सुझाव नहीं मिला",
                  profit: 0,
                  yield: 0,
                  reason: "डेटा के आधार पर कोई सुझाव नहीं।",
                },
              ],
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500, headers: corsHeaders }
    );
  }
}
