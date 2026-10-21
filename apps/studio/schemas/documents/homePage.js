export default {
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    {
      name: "seo",
      title: "SEO Meta",
    },
    {
      name: "hero",
      title: "Hero",
      default: true,
    },
    {
      name: "about",
      title: "Section About",
    },
    {
      name: "contact",
      title: "Section Contact",
    },
    {
      name: "portfolio",
      title: "Section Porfolio",
    },
    {
      name: "services",
      title: "Section Services",
    },
  ],
  fields: [
    {
      name: "seo",
      title: "SEO Meta",
      type: "pageSeo",
      group: "seo",
    },
    {
      name: "hero_title",
      type: "string",
      group: "hero",
    },
    {
      name: "hero_content",
      type: "text",
      group: "hero",
    },
    {
      name: "about_block",
      type: "section_content",
      group: "about",
    },
    {
      name: "partners_marquee",
      type: "array",
      of: [{ type: "partners_logo" }],
      group: "about",
    },
    {
      name: "services",
      type: "array",
      of: [{ type: "services_single" }],
      group: "services",
    },
    {
      name: "projects",
      type: "array",
      of: [
        {
          type: "section_projects",
        },
      ],
      group: "portfolio",
    },
    {
      name: "contact_section",
      type: "section_contact",
      group: "contact",
    },
  ],
};
