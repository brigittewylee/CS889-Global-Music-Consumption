import pandas as pd
import json

# ------------------------------------------------------------------------------
# synchronize iso names and ensure all countries present in both dataset and 
# country coordinate dataset
# ------------------------------------------------------------------------------

df = pd.read_csv("global_music_consumption/public/final_cleaned_data.csv")

x = df['country'].unique().tolist()
y = df['origin_country'].unique().tolist()
y.sort()
# print(x)
# print(y)

z = list(set(x + y))
z.sort()

df2 = pd.read_json("global_music_consumption/public/country_centroid.geojson")

loc = [x["properties"]["COUNTRY"] for x in df2.features]
loiso = [x["properties"]["ISO"] for x in df2.features]

subset = set(set(z)).issubset(set(loiso))
print(subset)
missing_countries = set(z) - set(loiso)
print("missing:", missing_countries)
print("countries:", loiso)
print("musixbrainz:", z)
doc = dict(zip(loiso, loc))
# print(doc)

lofn = []
for iso in z:
    lofn = lofn + [doc[iso]]

# print(lofn)

# ------------------------------------------------------------------------------
# create dictionary of country coordinates for arcs
# ------------------------------------------------------------------------------

df3 = pd.read_json("global_music_consumption/public/country_centroid.geojson")
docoords = {x["properties"]["ISO"]:x["geometry"]["coordinates"] for x in df3.features}
# print(docoords)

# with open('global_music_consumption/public/country_coordinates.json', 'w') as f:
#     json.dump(docoords, f, indent=4)
# remapped:
# XW/XC 
# UK --> GB
# added: 
# TW label, HK polygon + label

# ------------------------------------------------------------------------------
# create list of timeline year-month
# ------------------------------------------------------------------------------
timeline = df['month'].unique().tolist()
dot = [{"value":i, "time":timeline[i]} for i in range(len(timeline))]
print(dot)

with open('global_music_consumption/public/timeline.json', 'w') as f:
    json.dump(dot, f, indent=4)
print(timeline)
