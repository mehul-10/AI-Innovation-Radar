from textblob import TextBlob
from collections import Counter
import re


TEXT_COLUMNS = [
    "review",
    "reviews",
    "review_text",
    "feedback",
    "comment",
    "comments",
    "message",
    "ticket",
    "issue",
    "issue_description",
    "description",
    "complaint",
    "customer_review",
]


def find_text_column(df):

    for col in df.columns:

        name = col.lower().strip()

        if name in TEXT_COLUMNS:
            return col

    return None


def clean_words(text):

    text = text.lower()

    text = re.sub(r"[^a-zA-Z ]", " ", text)

    words = text.split()

    stop_words = {
        "the",
        "is",
        "was",
        "are",
        "i",
        "it",
        "a",
        "an",
        "and",
        "of",
        "to",
        "for",
        "my",
        "this",
        "that",
        "in",
        "on",
        "with",
        "very",
        "have",
        "had",
        "be",
        "been",
        "at",
    }

    return [
        w
        for w in words
        if len(w) > 3 and w not in stop_words
    ]


def analyse_sentiment(df):

    review_column = find_text_column(df)

    if review_column is None:

        return {
            "available": False
        }

    positive = 0
    neutral = 0
    negative = 0

    all_words = []

    for review in df[review_column].fillna(""):

        blob = TextBlob(str(review))

        polarity = blob.sentiment.polarity

        if polarity > 0.15:
            positive += 1

        elif polarity < -0.15:
            negative += 1

        else:
            neutral += 1

        all_words.extend(clean_words(str(review)))

    top_topics = [
        word
        for word, _
        in Counter(all_words).most_common(5)
    ]

    recommendations = []

    if negative > positive:

        recommendations.append(
            "Customer dissatisfaction is high. Review common complaints."
        )

    if "payment" in top_topics:

        recommendations.append(
            "Improve payment reliability."
        )

    if "support" in top_topics:

        recommendations.append(
            "Reduce customer support response time."
        )

    if "mobile" in top_topics:

        recommendations.append(
            "Improve mobile application experience."
        )

    if "login" in top_topics:

        recommendations.append(
            "Simplify login and authentication."
        )

    if not recommendations:

        recommendations.append(
            "Overall customer feedback appears healthy."
        )

    overall = "Neutral"

    if positive > negative:
        overall = "Positive"

    elif negative > positive:
        overall = "Negative"

    return {

        "available": True,

        "review_column": review_column,

        "positive": positive,

        "neutral": neutral,

        "negative": negative,

        "overall": overall,

        "top_topics": top_topics,

        "recommendations": recommendations,
    }