import pandas as pd

# pull out relevant variables
df = pd.read_csv("datasets/universal_top_spotify_songs.csv")

print(df.columns)

df1 = df[["spotify_id", "name", "artists", "country", "daily_rank", "snapshot_date"]]
df1["snapshot_date"] = pd.to_datetime(df1["snapshot_date"])
df1["month"] = df1["snapshot_date"].dt.to_period("M")
print(df1.columns)

print(df1["month"].unique)

df2 = df1[
    ["spotify_id", "name", "artists", "country", "daily_rank", "snapshot_date", "month"]
]

df2.to_csv("datasets/cleaned_data.csv")


# use borda rank to create monthly rankings
df = pd.read_csv("datasets/cleaned_data.csv")
countries = df["country"].unique()

df["borda_score"] = 51 - df["daily_rank"]
df = df.dropna()

ranked_borda = df.groupby(['country', 'month', 'name', 'artists'])['borda_score'].sum().reset_index()
ranked_borda = ranked_borda.sort_values(['month', 'country', 'borda_score'], ascending=[True, True, False])

monthly_top = ranked_borda.groupby(['country', 'month']).head(10).reset_index()
monthly_top.columns
monthly_top['month'].unique

monthly_top.to_csv("monthly_top.csv")
