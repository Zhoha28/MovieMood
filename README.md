# 🎬 MovieMood

MovieMood is a sleek and modern movie discovery app built with **React**, **Appwrite**, and the **TMDB API**. Users can search for movies, view trending results, and track the most searched movie terms using Appwrite's database.

---

## 📸 Preview

Discover movies, view trending searches, and enjoy a smooth, interactive UI.*

---

## 🚀 Features

- 🔎 **Search Movies** – Find movies using the TMDB API.
- 🔥 **Trending Searches** – View top searched movies.
- 🗂 **Appwrite Integration** – Track and store search counts for analytics.
- ⏱ **Debounced Search** – Prevents unnecessary API calls while typing.
- 📱 **Responsive UI** – Works great across screen sizes.

---

## 🛠 Tech Stack

- **Frontend:** React, TailwindCSS
- **API:** TMDB (The Movie Database)
- **Backend:** Appwrite (Database & ID service)

---

## 📦 Installation

```bash
git clone https://github.com/Zhoha28/MovieMood.git
cd moviemood
npm install
```

### 🧪 Setup `.env` file

Create a `.env` file in the root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DB_ID=your_appwrite_db_id
VITE_APPWRITE_COLLECTIONS_ID=your_appwrite_collection_id
```

---

## ▶️ Run the App

```bash
npm run dev
```

Visit `http://localhost:5173`

---

## ⚙️ Appwrite Configuration

1. Create a project on [Appwrite Cloud](https://cloud.appwrite.io/).
2. Create a **Database** and **Collection** with these fields:
    - `searchTerm` (String)
    - `count` (Number)
    - `movie_id` (String)
    - `poster_url` (String)
3. Update **permissions** to allow public access (`role:all`) for read/write (for testing).
4. Add your origin (`http://localhost:5173`) to CORS settings.

---

## ⚛️ React Hooks Used

- `useState` – For managing local state (e.g., searchTerm, movie list, loading)
- `useEffect` – To fetch movies on search term update
- `useDebounce` (from `react-use`) – For optimizing API calls by waiting for user to stop typing

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── Search.jsx
│   ├── MovieCard.jsx
│   ├── Spacer.jsx
│   └── Spinner.jsx
├── appwrite.js
├── App.jsx
└── main.jsx
```

---

## 🙋‍♂️ Credits

- 🎥 TMDB API for movie data
- ☁️ Appwrite for backend services
