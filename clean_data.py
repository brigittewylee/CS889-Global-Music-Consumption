import pandas as pd

df = pd.read_csv("universal_top_spotify_songs.csv")

print(df.columns)

df1 = df[["spotify_id", "name", "artists", "country", "daily_rank", "snapshot_date"]]
df1["snapshot_date"] = pd.to_datetime(df1["snapshot_date"])
df1["month"] = df1["snapshot_date"].dt.to_period("M")
print(df1.columns)

print(df1["month"].unique)

df2 = df1[
    ["spotify_id", "name", "artists", "country", "daily_rank", "snapshot_date", "month"]
]

df2.to_csv("cleaned_data.csv")
test = "apple"
