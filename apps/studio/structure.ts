import * as R from "ramda";
import {
  HiOutlineClipboard,
  HiOutlineDocumentText,
  HiOutlineHome,
  HiOutlineEnvelopeOpen,
  HiOutlineBars3,
  HiOutlineCog8Tooth,
  HiOutlineBriefcase,
  HiOutlinePhone,
  HiOutlinePencilSquare,
  HiOutlineUsers,
  HiOutlineEye,
} from "react-icons/hi2";
import { TbFileInvoice, TbReceipt2 } from "react-icons/tb";
import Invoice from "./plugins/invoices/components/InvoicePreview";

export const structure = (S: any, context: any) => {
  const { currentUser } = context;

  const adminItems: any[] = [
    S.listItem()
      .title("Site Settings")
      .icon(HiOutlineCog8Tooth)
      .child(
        S.editor()
          .id("siteSettings")
          .schemaType("siteSettings")
          .documentId("siteSettings")
      ),

    // main menu items
    S.listItem()
      .title("Main Menu")
      .icon(HiOutlineBars3)
      .child(
        S.editor()
          .title("Main Menu Items")
          .id("main_menu")
          .schemaType("main_menu")
          .documentId("main_menu")
      ),

    S.divider(),

    // home page
    S.listItem()
      .title("Home Page")
      .icon(HiOutlineHome)
      .child(
        S.editor()
          .title("Home Page Content")
          .id("homePage")
          .schemaType("homePage")
          .documentId("homePage")
      ),

    // Generic Pages
    S.listItem()
      .title("Pages")
      .icon(HiOutlineDocumentText)
      .child(S.documentTypeList("page").title("Pages")),

    // Portfolio
    S.listItem()
      .title("Portfolio")
      .icon(HiOutlineBriefcase)
      .child(
        S.editor()
          .title("Portfolio Items")
          .id("portfolio")
          .schemaType("portfolio")
          .documentId("portfolio")
      ),

    // Posts
    S.listItem()
      .title("Posts")
      .icon(HiOutlineClipboard)
      .child(S.documentTypeList("post").title("Posts")),

    // Project
    S.listItem()
      .title("Client Projects")
      .icon(HiOutlineUsers)
      .child(S.documentTypeList("project").title("Client Projects")),

    // Book Form Sumissions
    S.listItem()
      .title("Book Call Leads")
      .icon(HiOutlinePhone)
      .child(S.documentTypeList("bookCallForm").title("Book Call Leads")),

    // Contact Form Sumissions
    S.listItem()
      .title("Contact Form")
      .icon(HiOutlineEnvelopeOpen)
      .child(S.documentTypeList("contactForm").title("Contact Form")),

    S.divider(),

    // Clients
    S.listItem()
      .title("Clients")
      .icon(HiOutlineUsers)
      .child(S.documentTypeList("clients").title("Clients")),

    // Invoices
    S.listItem()
      .title("Invoices")
      .icon(TbFileInvoice)
      .child(
        S.documentTypeList("invoices")
          .title("Invoices")
          .child(() =>
            S.document()
              .schemaType("invoices")
              .views([
                S.view.form().icon(HiOutlinePencilSquare),
                S.view.component(Invoice).icon(HiOutlineEye).title("Preview"),
              ])
          )
          .defaultOrdering([{ field: "invoice_number", direction: "desc" }])
          .menuItems([
            S.orderingMenuItem({
              title: "Sort by date",
              by: [{ field: "invoice_date", direction: "desc" }],
            }),
            S.orderingMenuItem({
              title: "Sort by Invoice",
              by: [{ field: "invoice_number", direction: "desc" }],
            }),
          ])
      ),

    S.listItem()
      .title("Expenses")
      .icon(TbReceipt2)
      .child(
        S.documentTypeList("expenses")
          .title("Expenses")
          .defaultOrdering([{ field: "date", direction: "desc" }])
      ),

    S.divider(),

    S.listItem()
      .title("Persons")
      .schemaType("person")
      .child(
        S.documentList("person")
          .title("Persons")
          .filter("_type == $type")
          .params({ type: "person" })
      ),
  ];

  const defaultItems: any[] = [];

  return S.list()
    .title("Content")
    .items(
      // Display List Items based on role of current user
      // if admin or custom with developer role
      // display admin items
      R.or(
        R.equals(currentUser?.role, "administrator"),
        R.and(
          R.equals(currentUser?.role, "custom"),
          R.compose(
            R.propEq("name", "developer"),
            R.head,
            R.prop("roles")
          )(currentUser)
        )
      )
        ? [...adminItems]
        : [...defaultItems]
    );
};
