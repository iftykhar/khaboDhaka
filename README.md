# 🥘 Khabo Dhaka

**Khabo Dhaka** is a high-performance, minimal food exploration platform built for the Dhaka metropolis. It leverages **Barikoi’s high-precision geospatial data** to provide a seamless "Search-to-Table" experience.

---

## 🚀 Technical Highlights

This project serves as a technical demonstration of modern frontend architecture and geospatial integration.

* **Mapping Engine**: Powered by `bkoi-gl` (Barikoi JS) for high-fidelity vector tile rendering and native-feeling map interactions.
* **Search Architecture**: Utilizes **Next.js Server Actions** to securely fetch data from Barikoi’s Autocomplete API, ensuring the `BARIKOI_API_KEY` remains server-side.
* **State Management**: Orchestrated via **Zustand** to synchronize the Search UI and the Map Camera (`flyTo` animations) without unnecessary re-renders.
* **Performance Optimization**:
* **Debounced API Requests**: Implemented a custom hook to minimize API overhead during user input.
* **Lazy Loading**: The map component is dynamically imported via `next/dynamic` to maintain a lightning-fast initial page load.



---

## 🎨 Design & UX

The interface follows a **Minimalist Single-Page** philosophy, prioritizing the map as the primary interactive element.

* **Hero Section**: A bold, animated entrance using **Framer Motion** to set the brand tone.
* **Floating Search Overlay**: A glassmorphic, semi-transparent UI that sits over the map, allowing for an uninterrupted exploration experience.
* **Custom Markers**: Replaced standard pins with Tailwind-styled SVG markers that scale and pulse based on user interaction.
* **Mobile-First**: Designed with a responsive grid that ensures the map is functional and "fat-finger friendly" on mobile devices.

---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Mapping** | bkoi-gl (Barikoi Maps GL) |
| **State** | Zustand |
| **Animation** | Framer Motion |

---

## 📖 Local Setup

1. **Clone the repo**:
```bash
git clone https://github.com/your-username/khabo-dhaka.git

```


2. **Install dependencies**:
```bash
npm install

```


3. **Configure Environment**: Create a `.env.local` file:
```env
BARIKOI_API_KEY=your_barikoi_key_here

```


4. **Run the development server**:
```bash
npm run dev

```


