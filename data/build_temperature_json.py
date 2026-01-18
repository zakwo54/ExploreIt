import pandas as pd
import json
from iso3166 import countries_by_name

# Load raw city temperature data
df = pd.read_csv("GlobalLandTemperaturesByCity.csv")

# Filter for city monthly averages (if dataset contains daily)
# If the CSV already contains monthly averages, this step may differ.

# We want only the specific months
df["dt"] = pd.to_datetime(df["dt"])
df = df[df["dt"].dt.month.isin([1, 3, 7, 11])]

# Get average for each city/country/month
agg = df.groupby(["City", "Country", "Latitude", "Longitude", df["dt"].dt.month_name()])["AverageTemperature"].mean().reset_index()

# Pivot
pivot = agg.pivot_table(values="AverageTemperature", index=["City", "Country", "Latitude", "Longitude"], columns="dt", aggfunc="first").reset_index()

# Build JSON
records = []
for _, r in pivot.iterrows():
    try:
        iso3 = countries_by_name[r["Country"].upper()].alpha3
    except:
        iso3 = None

    record = {
        "city": r["City"],
        "country": r["Country"],
        "country_iso3": iso3,
        "lat": float(r["Latitude"]),
        "lon": float(r["Longitude"]),
        "temperatures": {
            "Jan": None if pd.isna(r.get("January")) else round(r["January"], 1),
            "Mar": None if pd.isna(r.get("March")) else round(r["March"], 1),
            "Jul": None if pd.isna(r.get("July")) else round(r["July"], 1),
            "Nov": None if pd.isna(r.get("November")) else round(r["November"], 1)
        }
    }
    records.append(record)

with open("country_temperatures.json", "w") as f:
    json.dump(records, f, indent=2)
