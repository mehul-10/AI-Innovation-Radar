def generate_recommendations(df):

    recommendations = []

    rows = len(df)
    cols = len(df.columns)

    missing = int(df.isnull().sum().sum())
    duplicates = int(df.duplicated().sum())

    numeric = len(df.select_dtypes(include="number").columns)
    categorical = len(df.select_dtypes(include="object").columns)

    summary = (
        f"This dataset contains {rows} rows and {cols} columns. "
        f"It has {missing} missing values and {duplicates} duplicate rows. "
        f"The dataset includes {numeric} numeric columns and "
        f"{categorical} categorical columns."
    )

    if missing == 0:
        recommendations.append("No missing values detected.")
    elif missing < 10:
        recommendations.append("Only a few missing values were found.")
    else:
        recommendations.append(
            f"{missing} missing values detected. Clean the dataset before analysis."
        )

    if duplicates == 0:
        recommendations.append("No duplicate rows found.")
    else:
        recommendations.append(
            f"{duplicates} duplicate rows detected. Consider removing duplicates."
        )

    recommendations.append(
        f"Dataset contains {numeric} numeric columns suitable for AI analysis."
    )

    if cols >= 10:
        recommendations.append("Rich feature set detected.")
    else:
        recommendations.append("Adding more features could improve analysis quality.")

    return {
        "summary": summary,
        "recommendations": recommendations
    }