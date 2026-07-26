import pandas as pd


def analyze_data(df):

    rows = len(df)
    columns = len(df.columns)

    missing_values = df.isnull().sum().to_dict()
    total_missing = int(df.isnull().sum().sum())

    duplicate_rows = int(df.duplicated().sum())

    quality_score = 100

    quality_score -= min(total_missing * 2, 30)
    quality_score -= min(duplicate_rows * 5, 20)

    if rows < 50:
        quality_score -= 10

    if columns < 5:
        quality_score -= 10

    quality_score = max(0, quality_score)

    if quality_score >= 90:
        status = "Excellent"
    elif quality_score >= 75:
        status = "Good"
    elif quality_score >= 60:
        status = "Fair"
    else:
        status = "Poor"

    numeric_summary = {}

    try:
        numeric_summary = df.describe(include="number").to_dict()
    except Exception:
        numeric_summary = {}
        


    report = {
        "rows": rows,
        "columns": columns,
        "column_names": list(df.columns),
        "missing_values": missing_values,
        "total_missing": total_missing,
        "data_types": df.dtypes.astype(str).to_dict(),
        "duplicate_rows": duplicate_rows,
        "quality_score": quality_score,
        "quality_status": status,
        "numeric_summary": numeric_summary,
        "preview": df.head(5).fillna("").to_dict(orient="records")
    }

    return report