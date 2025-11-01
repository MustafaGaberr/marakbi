"use client";

import { usePathname } from "next/navigation";

export default function useDynamicHero() {
  const pathname = usePathname();

  const paths = [
    {
      route: "/about",
      title: "About\nUs",
      description:
        "No matter the journey, we have a boat for your story. Explore Egypt’s stunning waterways with a curated selection of vessels and seasoned captains.",
      background: "/mainBg.jpg",
    },
    {
      route: "/boat-listing",
      title: "Boat\nListing",
      description:
        "No matter the journey, we have a boat for your story. Explore Egypt's stunning waterways with a curated selection of vessels and seasoned captains.",
      background: "/mainBg.jpg",
    },
    {
      route: "/boat-details",
      title: "Boat\nName",
      description:
        "No Matter The Journey, We Have A Boat For Your Story. Explore Egypt's Stunning Waterways With A Curated Selection Of Vessels And Seasoned Captains.",
      background: "/mainBg.jpg",
    },
    {
      route: "/contact",
      title: "Contact\nUs",
      description:
        "Get in touch with our team for bookings, inquiries, or partnership opportunities.",
      background: "/contactBg.jpg",
    },
    {
      route: "/faqs",
      title: "FAQS",
      description:
        "Set sail with Marakbi and explore Egypt from a new angle — smooth waters, local stories, and moments you'll remember long after the trip ends.",
      background: "/images/Rectangle 5654.png",
    },
    {
      route: "/our-team",
      title: "Our\nTeam",
      description:
        "Marakbi is powered by a dedicated team of maritimeprofessionals, travel experts, and hospitality specialists. Ourteam combines deep local knowledge with modern booking tools to deliver seamless boat experiences.",
      background: "/images/Rectangle 56548.jpg",
    },
    {
      route: "/profile",
      title: "My\nProfile",
      description:
        "No Matter The Journey, We Have A Boat For Your Story. Explore Egypt&apos;s Stunning Waterways With A Curated Selection Of Vessels And Seasoned Captains.",
      background: "/images/Rectangle 56548.jpg",
    },
  ];

  // Find the route that matches the current pathname
  const matchedPath =
    paths.find((path) => pathname.includes(path.route)) || paths[0];

  // Split the title by \n for multi-line rendering
  const title = matchedPath.title;

  return {
    title,
    description: matchedPath.description,
    background: matchedPath.background,
  };
}
