import React from "react";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import BlackIcon from "../images/invoice-icon-black.png";
import WhiteIcon from "../images/invoice-icon.png";
import BlackLogo from "../images/logo-black.png";
import WhiteLogo from "../images/logo-light.png";

import { mapIndexed } from "../../../utils/Helpers";

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  backgroundDark: {
    backgroundColor: "#191919",
    height: "100%",
    widht: "100%",
  },
  backgroundLight: {
    backgroundColor: "#fff",
    height: "100%",
    widht: "100%",
  },
  companyLogo: {
    left: 10,
    padding: 10,
    position: "absolute",
    textAlign: "left",
    top: 10,
    width: 150,
  },
  invoiceIconDark: {
    borderLeft: "1px solid white",
    borderBottom: "1px solid white",
    right: 0,
    padding: 0,
    position: "absolute",
    height: 96,
    width: 96,
  },
  invoiceIconLight: {
    borderLeft: "1px solid #191919",
    borderBottom: "1px solid #191919",
    right: 0,
    padding: 0,
    position: "absolute",
    height: 96,
    width: 96,
  },
  invoiceLogoImg: {
    right: 16,
    padding: 10,
    position: "absolute",
    textAlign: "left",
    top: 16,
    height: 60,
  },
  invoiceContainerLight: {
    backgroundColor: "#fff",
    borderRight: "1px solid #191919",
    borderTop: "1px solid #191919",
    height: "100%",
    margin: "95px 95px 0 0",
    padding: 20,
    paddingBottom: 25,
  },
  invoiceContainerDark: {
    backgroundColor: "#fff",
    borderRight: "1px solid #fff",
    borderTop: "1px solid #fff",
    height: "100%",
    margin: "95px 95px 0 0",
    padding: 20,
    paddingBottom: 25,
  },
  invoiceContainerDetails: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    widht: "100%",
  },
  invoiceDate: {
    color: "#191919",
    flexDirection: "column",
    justifyItems: "flex-end",
  },
  businessInfo: {
    color: "#191919",
    flexDirection: "column",
    justifyContent: "right",
  },
  invoiceDetails: {
    padding: "30px 0",
  },
  invoiceDetailsHeading: {
    alignItems: "center",
    borderBottom: "2px solid #874da2",
    color: "#e15d55",
    flexDirection: "row",
    fontSize: 14,
    fontWeight: 600,
    justifyContent: "space-around",
    padding: "10px 0",
    textAlign: "center",
    textTransform: "uppercase",
    width: "100%",
  },
  invoiceDetailsContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    columnGap: 5,
    flexWrap: "wrap",
    flexBasis: "auto",
    padding: "30px 0",
  },
  invoiceRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "20px 0",
  },
  desc: {
    flexDirection: "column",
    fontSize: 12,
    flex: "1 0 35%",
  },
  col: {
    flexDirection: "column",
    flex: "1 0 20%",
    fontSize: 12,
    paddingBottom: 10,
    textAlign: "center",
  },
  colDesc: {
    flexDirection: "column",
    flex: "1 0 33%",
    fontSize: 12,
    paddingBottom: 10,
    textAlign: "center",
    width: 500
  },
  invoiceTotals: {
    alignItems: "center",
    borderTop: "1px solid #191919",
    flexDirection: "row",
    fontSize: 24,
    justifyContent: "flex-end",
    justifySelf: "flex-end",
    paddingTop: 40,
    textDecoration: "underline",
  },
  companyInfo: {
    bottom: 50,
    left: 20,
    position: "absolute",
  },
});

const Invoice = (props) => {
  let subTotal = null;
  const { invoice, theme } = props;

  return (
    <Document>
      <Page size="LETTER">
        <View
          style={
            theme === "light" ? styles.backgroundLight : styles.backgroundDark
          }
        >
          <View style={styles.header} fixed>
            <View>
              <Image
                style={styles.companyLogo}
                src={theme === "light" ? BlackLogo : WhiteLogo}
              />
            </View>
            <View
              style={
                theme === "light"
                  ? styles.invoiceIconLight
                  : styles.invoiceIconDark
              }
            >
              <Image
                style={styles.invoiceLogoImg}
                src={theme === "light" ? BlackIcon : WhiteIcon}
              />
            </View>
          </View>
          <View
            style={
              theme === "light"
                ? styles.invoiceContainerLight
                : styles.invoiceContainerDark
            }
          >
            <View style={styles.invoiceContainerDetails}>
              <View style={styles.invoiceDate}>
                <Text>Invoice No: {invoice.invoice_number}</Text>
                <Text>Date: {invoice.invoice_date}</Text>
                <Text>Due Date: {invoice.invoice_due_date}</Text>
              </View>
              <View style={styles.businessInfo}>
                {invoice.client.client_name && (
                  <Text style={styles.clientName}>
                    {invoice.client.client_name}
                  </Text>
                )}
                {invoice.client.client_contact && (
                  <Text style={styles.clientContact}>
                    {invoice.client.client_contact}
                  </Text>
                )}
                {invoice.client.client_address_1 && (
                  <Text style={styles.clientDetails}>
                    {invoice.client.client_address_1}
                  </Text>
                )}
                {invoice.client.client_address_2 && (
                  <Text style={styles.clientDetails}>
                    {invoice.client.client_address_2}
                  </Text>
                )}
                <Text style={styles.clientDetails}>
                  {invoice.client.client_city}, {invoice.client.client_state}{" "}
                  {invoice.client.client_zip}
                </Text>
              </View>
            </View>
            <View style={styles.invoiceDetails}>
              <View style={styles.invoiceDetailsHeading}>
                <View style={styles.colDesc}>
                  <Text>Description</Text>
                </View>
                <View style={styles.col}>
                  <Text>Hrs / Qty</Text>
                </View>
                <View style={styles.col}>
                  <Text>Rate / Price</Text>
                </View>
                <View style={styles.col}>
                  <Text>Total</Text>
                </View>
              </View>
              <View style={styles.invoiceDetailsContent}>
                {
                  // mapping through all the items in the invoice
                  mapIndexed((invoice, index) => {
                    // adding the subtotal operation to the variable for later use
                    subTotal += invoice.price * invoice.quantity;

                    return (
                      <View key={index} style={styles.invoiceRow}>
                        <View style={styles.desc}>
                          <Text>{invoice.description}</Text>
                        </View>
                        <View style={styles.col}>
                          <Text>{invoice.quantity}</Text>
                        </View>
                        <View style={styles.col}>
                          <Text>$ {invoice.price}</Text>
                        </View>
                        <View style={styles.col}>
                          <Text>
                            $
                            {(
                              invoice.price * invoice.quantity
                            ).toLocaleString()}
                          </Text>
                        </View>
                      </View>
                    );
                  })(invoice.invoiceItems)
                }
              </View>
              <View style={styles.invoiceTotals}>
                <Text>Total Due: $ {subTotal.toLocaleString()}</Text>
              </View>
            </View>
            <View style={styles.companyInfo}>
              <Text>ZERA US LLC</Text>
              <Text>7655 Lone Shepherd Dr.</Text>
              <Text>Las Vegas, NV 89166</Text>
              <Text>(702) 350-1098</Text>
              <Text>contact@zera.us</Text>
              <Text>https://zera.us</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const Inv = (props) => {
  let subTotal = null;

  return (
    <Document>
      <Page size="A4">
        <div className={styles.invoiceContainer}>
          <div>
            <div className={styles.invoiceClientInfo}></div>
          </div>
          <div className={styles.businessInfo}>
            {props.client.client_name && (
              <h3 className={styles.clientName}>{props.client.client_name}</h3>
            )}
            {props.client.client_contact && (
              <p className={styles.clientContact}>
                {props.client.client_contact}
              </p>
            )}
            {props.client.client_address_1 && (
              <p className={styles.clientDetails}>
                {props.client.client_address_1}
              </p>
            )}
            {props.client.client_address_2 && (
              <p className={styles.clientDetails}>
                {props.client.client_address_2}
              </p>
            )}
            <p className={styles.clientDetails}>
              {props.client.client_city}, {props.client.client_state}{" "}
              {props.client.client_zip}
            </p>
          </div>
        </div>
      </Page>
    </Document>
  );
};

export default Invoice;
