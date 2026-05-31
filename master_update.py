import json, urllib.request, urllib.parse, time, os

SB_URL = "https://zaqkctlrvebulnbvirzl.supabase.co/rest/v1"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo"
HEADERS = {"apikey": KEY, "Authorization": "Bearer " + KEY, "Content-Type": "application/json"}

NICHE_LINKS = {
  "vpn": "https://www.awin1.com/cread.php?awinmid=9399&awinaffid=2834344&clickref=msm_vpn_nord&p=",
  "saas": "https://www.awin1.com/cread.php?awinmid=6288&awinaffid=2834344&clickref=msm_saas_fiverr&p=",
  "fintech": "https://www.awin1.com/cread.php?awinmid=6288&awinaffid=2834344&clickref=msm_fintech_wise&p=",
  "gaming": "https://www.awin1.com/cread.php?awinmid=24882&awinaffid=2834344&clickref=msm_gaming_gmg&p=",
  "travel": "https://www.awin1.com/cread.php?awinmid=5551&awinaffid=2834344&clickref=msm_travel_booking&p=",
  "pet": "https://www.awin1.com/cread.php?awinmid=112976&awinaffid=2834344&clickref=msm_pet_brisks&p=",
  "wfh": "https://www.awin1.com/cread.php?awinmid=61655&awinaffid=2834344&clickref=msm_wfh_bttoffice&p=",
  "outdoor": "https://www.awin1.com/cread.php?awinmid=112976&awinaffid=2834344&clickref=msm_outdoor_brisks&p=",
  "smarthome": "https://www.awin1.com/cread.php?awinmid=295&awinaffid=2834344&clickref=msm_smarthome_create&p=",
  "aiproductivity": "https://www.awin1.com/cread.php?awinmid=6288&awinaffid=2834344&clickref=msm_ai_fiverr&p=",
  "fashion": "https://www.awin1.com/cread.php?awinmid=1006&awinaffid=2834344&clickref=msm_fashion_safeshop&p=",
  "electronics": "https://www.awin1.com/cread.php?awinmid=24882&awinaffid=2834344&clickref=msm_electronics_gmg&p=",
}

TITLE_SEEDS = {
  "vpn": [
    "NordVPN Review 2026: Is It Worth It? (Expert Audit)",
    "Surfshark vs NordVPN: Cheapest Price Compared 2026",
    "ExpressVPN Promo Code 2026 - Verified 49% Discount",
    "Best VPN for Netherlands 2026 - Tested and Ranked",
    "Best VPN for Streaming Netflix 2026 - Unblocking Test",
    "Cheapest VPN Deal 2026 - Best Prices Live Compared",
    "NordVPN Black Friday Deal 2026 - Lowest Price Ever",
    "VPN with No Logs Policy 2026 - Full Privacy Audit",
    "Best VPN for Germany 2026 - Speed Test Results",
    "VPN for Gaming 2026: Lowest Ping Compared"
  ],
  "saas": [
    "Fiverr vs Upwork 2026: Which Freelance Platform Pays More",
    "Best Website Builder 2026 - Create.net Full Expert Review",
    "Cheapest Web Hosting 2026: UKHost4u vs Namecheap Compared",
    "Best SaaS Tools for Solopreneurs 2026 - Free and Paid",
    "Fiverr Pro Review 2026: Worth the Premium Price",
    "Best Productivity Tools 2026 - Ranked by AI Audit Score",
    "Notion vs Monday.com 2026: Which SaaS Actually Wins",
    "Best CRM Software 2026 Under 50 EUR Per Month",
    "Top 10 Marketing Tools 2026 - Verified Expert Picks",
    "AI Writing Tools 2026: ChatGPT vs Jasper vs Copy.ai"
  ],
  "gaming": [
    "Cheapest Steam Keys 2026 - Green Man Gaming vs Instant Gaming",
    "Best Gaming Mouse Under 50 EUR 2026 - Expert Review",
    "Cheapest Game Keys Right Now - Live Price Tracker 2026",
    "Best Gaming VPN 2026 - Lowest Ping and Zero Lag",
    "Best Mechanical Keyboards 2026 Under 100 EUR",
    "Discount Gaming Gear 2026 - Up to 60 Percent Off",
    "Best Budget Gaming PC Build 2026 Under 800 EUR",
    "GTA VI PC Requirements 2026 - Can Your PC Run It",
    "Best Gaming Monitor 2026 Under 300 EUR Full Review",
    "Logitech vs Razer vs SteelSeries 2026 - Which Brand Wins"
  ],
  "fintech": [
    "Wise vs Revolut 2026: Cheapest International Transfer",
    "Best Business Account Netherlands 2026 - Zero Fees",
    "Revolut Business Review 2026 - Is It Actually Safe",
    "Wise Money Transfer Review 2026 - Hidden Fees Exposed",
    "Best Fintech Apps 2026 for Freelancers and Nomads",
    "Cheapest EUR USD Transfer 2026 - Live Rate Comparison",
    "Best Crypto Exchange EU 2026 - All Fees Compared",
    "Bunq vs N26 vs Revolut 2026 - Which Bank Is Best",
    "Best Invoicing Software for Freelancers 2026",
    "Top 5 Payment Processors for Online Stores 2026"
  ],
  "travel": [
    "Booking.com vs Airbnb 2026: Which Is Actually Cheaper",
    "Best Travel Insurance 2026 - Full Coverage Compared",
    "Cheapest Flights Amsterdam to Barcelona 2026",
    "Best Credit Card for Travel 2026 - Zero Forex Fees",
    "Booking.com Promo Code 2026 - Verified 15 Percent Off",
    "Best Hotels Amsterdam 2026 Under 120 EUR Per Night",
    "Travel eSIM 2026 - Cheapest Data Abroad Compared",
    "Cheap Car Rental Europe 2026 - No Hidden Fees",
    "Best Travel Deals 2026 - Last Minute Verified Offers",
    "Best Travel Backpack 2026 - Carry-On Approved Ranked"
  ],
  "pet": [
    "Best Dry Dog Food 2026 - Vet Approved Expert Rankings",
    "Cheapest Pet Insurance Netherlands 2026 Full Compared",
    "Zooplus vs Pets at Home 2026 - Price Comparison Test",
    "Best Cat Food 2026 - Full Ingredient Audit Results",
    "Cheapest Dog Food Online 2026 - Auto-Delivery Deals",
    "Best Dog GPS Tracker 2026 - Fully Tested and Ranked",
    "Best Automatic Cat Feeder 2026 - Smart and Reliable",
    "Pet Insurance Germany 2026 - Cheapest Full Cover Plan",
    "Best Dog Beds 2026 Under 60 EUR - Comfort Tested",
    "Top 10 Pet Supplements 2026 - Lab Verified Results"
  ],
  "wfh": [
    "Best Standing Desk 2026 Under 400 EUR - Ergonomic Review",
    "Best Home Office Chair 2026 - Lumbar Support Compared",
    "Best Webcam for Remote Work 2026 - 4K vs 1080p Test",
    "Home Office Setup 2026 Under 1000 EUR - Full Build Guide",
    "Best Noise-Cancelling Headphones 2026 for Working from Home",
    "Best Monitor for WFH 2026 - Ultrawide vs 4K Compared",
    "Best Desk Lamp 2026 for Eye Strain - Top Picks Ranked",
    "Best Keyboard and Mouse Combo 2026 - Wireless Tested",
    "Best Router for Working from Home 2026 - Speed Tested",
    "Best WFH Essentials 2026 - Back to the Office Picks"
  ],
  "outdoor": [
    "Best Hiking Boots 2026 Under 150 EUR - Waterproof Tested",
    "Best Camping Gear 2026 - Lightweight and Durable Ranked",
    "Best Backpack for Hiking 2026 - 40L vs 60L Compared",
    "Brisks Outdoors Review 2026 - Is It Worth Buying From",
    "Best Tent 2026 for 2 People - Weatherproof Fully Ranked",
    "Best Trekking Poles 2026 Under 80 EUR Full Review",
    "Best Outdoor GPS Watch 2026 - Altimeter Compared",
    "Best Waterproof Jacket 2026 Under 200 EUR Ranked",
    "Best Camping Stove 2026 - Weight vs Power Audit",
    "Best Sleeping Bag 2026 for Cold Weather Conditions"
  ],
  "smarthome": [
    "Best Smart Home Devices 2026 - Google vs Apple HomeKit",
    "Philips Hue vs LIFX 2026 - Which Smart Bulb Wins",
    "Best Smart Thermostat 2026 - Energy Savings Tested",
    "Best Smart Lock 2026 - Full Security Ranked",
    "Cheapest Smart Home Starter Pack 2026 Full Review",
    "Best Amazon Echo vs Google Nest 2026 Compared",
    "Best Smart Security Camera 2026 Under 100 EUR",
    "Best Robot Vacuum 2026 - Mapping and Suction Compared",
    "Best Smart Plugs 2026 - Energy Monitoring Ranked",
    "Best Smart Doorbell 2026 - Ring vs Eufy Full Test"
  ],
  "aiproductivity": [
    "Best AI Tools for Freelancers 2026 - Free and Paid",
    "ChatGPT vs Claude vs Gemini 2026 - Which Is Actually Best",
    "Best AI Writing Assistant 2026 - Expert Fully Tested",
    "Fiverr AI Services Review 2026 - Worth the Cost",
    "Best AI Image Generator 2026 - Midjourney vs DALL-E",
    "Best AI Tools for Small Business 2026 Full Ranked",
    "AI Video Editor 2026 - Top 5 Tools Fully Compared",
    "Best AI Chatbot for Customer Service 2026",
    "AI Productivity Suite 2026 - Full Stack Compared",
    "Best AI SEO Tools 2026 - Traffic Growth Tested"
  ],
  "fashion": [
    "Best Online Fashion Stores 2026 - Price and Quality",
    "Sustainable Fashion Brands 2026 - Eco Ranked List",
    "Best Sneakers 2026 Under 120 EUR - Comfort Tested",
    "ASOS vs Zalando 2026 - Which Fashion Store Is Cheaper",
    "Best Capsule Wardrobe 2026 on a Budget Full Guide",
    "Best Winter Jacket 2026 Under 200 EUR Fully Ranked",
    "Best Running Shoes 2026 - Performance Ranked Expert",
    "Cheapest Designer Alternatives 2026 - Dupes Ranked",
    "Best Denim Jeans 2026 - Fit and Durability Full Test",
    "Fashion Discount Codes 2026 - Verified Coupons Listed"
  ],
  "electronics": [
    "Best Laptop 2026 Under 1000 EUR - Performance Ranked",
    "MacBook Air M3 vs Dell XPS 15 2026 - Full Compared",
    "Best Noise-Cancelling Earbuds 2026 Under 150 EUR",
    "Best 4K Monitor 2026 for Gaming and Work Ranked",
    "Best Smartphone 2026 Under 500 EUR - Full Ranked List",
    "iPhone 16 vs Samsung Galaxy S25 2026 - Honest Review",
    "Best Portable Charger 2026 - 100W Fully Tested",
    "Best Mechanical Keyboard 2026 - All Switches Compared",
    "Best USB Hub 2026 for MacBook and Windows Users",
    "Best Smart TV 2026 Under 600 EUR - Picture Quality Test"
  ]
}

def slugify(title):
    import re
    s = title.lower()
    s = re.sub(r"[^a-z0-9\s-]", "", s)
    s = re.sub(r"\s+", "-", s.strip())
    return s[:60]

def fetch_ids(niche, offset=0, limit=30):
    url = SB_URL + "/hubs_content?niche=eq." + niche + "&select=id&limit=" + str(limit) + "&offset=" + str(offset)
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=15) as res:
        return json.loads(res.read())

def patch_record(record_id, data):
    url = SB_URL + "/hubs_content?id=eq." + record_id
    body = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(url, data=body, headers=HEADERS, method="PATCH")
    with urllib.request.urlopen(req, timeout=10) as res:
        return res.status

print("Starting batched affiliate + SEO upgrade...", flush=True)
total = 0

for niche in NICHE_LINKS:
    link = NICHE_LINKS[niche]
    titles = TITLE_SEEDS.get(niche, [])
    offset = 0
    niche_count = 0
    
    print("[" + niche.upper() + "] Updating...", flush=True)
    
    while True:
        try:
            ids = fetch_ids(niche, offset, 30)
        except Exception as e:
            print("  Fetch error at offset " + str(offset) + ":", str(e)[:60], flush=True)
            break
        
        if not ids:
            break
        
        for i, rec in enumerate(ids):
            title_idx = (offset + i) % len(titles) if titles else 0
            new_title = titles[title_idx] if titles else None
            
            patch_data = {"affiliate_url": link}
            if new_title:
                patch_data["title"] = new_title
                patch_data["slug"] = slugify(new_title) + "-" + rec["id"][:4]
                patch_data["excerpt"] = "Expert 2026 review and price comparison. " + new_title + ". Independent audit with verified partner deals."
            
            try:
                patch_record(rec["id"], patch_data)
                niche_count += 1
                total += 1
            except Exception as e:
                print("  Failed to patch record " + rec["id"] + ": " + str(e)[:60], flush=True)
        
        offset += 30
        if len(ids) < 30:
            break
        time.sleep(0.5)  # Rate limit
    
    print("  " + str(niche_count) + " records updated", flush=True)

print("GRAND TOTAL UPDATED:", total, flush=True)
