import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// ফন্ট এবং কালার প্যালেট
const colors = {
  primary: '#2563eb',
  secondary: '#1e3a8a',
  accent: '#f8fafc',
  border: '#e2e8f0',
  textHeader: '#64748b',
  textDark: '#0f172a'
};

const styles = StyleSheet.create({
  page: { 
    padding: 50, 
    fontSize: 10, 
    fontFamily: 'Helvetica', 
    color: colors.textDark,
    backgroundColor: '#fff' 
  },
  
  // সুন্দর বর্ডার ডিজাইন
  pageBorder: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#2563eb',
    opacity: 0.1
  },

  // হেডার সেকশন
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 40, 
    alignItems: 'center' 
  },
  logoSection: { flexDirection: 'column' },
  logoText: { fontSize: 24, fontWeight: 'bold', color: colors.primary, letterSpacing: 1 },
  logoSub: { fontSize: 8, color: colors.textHeader, marginTop: 2, textTransform: 'uppercase' },

  // ইনভয়েস টাইটেল
  invoiceTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: colors.secondary, 
    textAlign: 'right' 
  },
  invoiceMeta: { fontSize: 9, color: colors.textHeader, textAlign: 'right', marginTop: 5 },

  // অ্যাড্রেস এবং ইনফো সেকশন
  detailsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 30 
  },
  billingColumn: { width: '45%' },
  infoColumn: { width: '45%' },
  label: { fontSize: 8, color: colors.textHeader, marginBottom: 4, fontWeight: 'bold', textTransform: 'uppercase' },
  boldText: { fontSize: 11, fontWeight: 'bold', color: colors.secondary, marginBottom: 2 },
  normalText: { fontSize: 9, color: '#475569', lineHeight: 1.4 },

  // স্ট্যাটাস ব্যাজ ফিক্সড
  statusBadge: { 
    backgroundColor: '#dcfce7', 
    color: '#166534', 
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4, 
    fontSize: 8, 
    marginTop: 5, 
    alignSelf: 'flex-start' 
  },

  // পেমেন্ট হাইলাইট কার্ড
  paymentHighlight: {
    backgroundColor: colors.accent,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e2e8f0'
  },

  // টেবিল ডিজাইন (প্রফেশনাল ফরম্যাট)
  table: { display: 'table', width: 'auto', borderStyle: 'solid', marginTop: 10 },
  tableHeader: { 
    flexDirection: 'row', 
    backgroundColor: colors.secondary, 
    paddingVertical: 8,
    paddingHorizontal: 12,
    // 🔥 এখানে আলাদাভাবে বর্ডার রেডিয়াসের দিকগুলো বলা হয়েছে (এরর ফিক্স)
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tableRow: { 
    flexDirection: 'row', 
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1, 
    borderBottomColor: colors.border,
    alignItems: 'center'
  },
  th: { color: '#fff', fontSize: 9, fontWeight: 'bold' },
  td: { fontSize: 10, color: colors.textDark },
  
  colDesc: { flex: 3 },
  colQty: { flex: 1, textAlign: 'center' },
  colPrice: { flex: 1, textAlign: 'right' },
  colTotal: { flex: 1, textAlign: 'right' },

  // টোটাল সেকশন
  totalWrapper: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 },
  totalContainer: { width: '35%', borderTopWidth: 2, borderTopColor: colors.primary, paddingTop: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  grandTotal: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10, 
    paddingTop: 10, 
    borderTopWidth: 1, 
    borderTopColor: colors.border 
  },
  grandTotalLabel: { fontSize: 12, fontWeight: 'bold', color: colors.primary },
  grandTotalValue: { fontSize: 14, fontWeight: 'bold', color: colors.secondary },

  // ফুটার
  footer: { 
    position: 'absolute', 
    bottom: 50, 
    left: 50, 
    right: 50, 
    textAlign: 'center', 
    borderTopWidth: 1, 
    borderTopColor: colors.border, 
    paddingTop: 15 
  },
  footerText: { fontSize: 8, color: colors.textHeader, lineHeight: 1.5 }
});

const InvoiceDocument = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.pageBorder} />

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoSection}>
          <Text style={styles.logoText}>ZERO OLYMPIAD</Text>
          <Text style={styles.logoSub}>The Global Environmental Challenge</Text>
        </View>
        <View>
          <Text style={styles.invoiceTitle}>PAYMENT INVOICE</Text>
          <Text style={styles.invoiceMeta}>Date: {new Date(invoice.date).toLocaleDateString()}</Text>
          <Text style={styles.invoiceMeta}>No: {invoice.invoice_id}</Text>
        </View>
      </View>

      {/* Details Row */}
      <View style={styles.detailsRow}>
        <View style={styles.billingColumn}>
          <Text style={styles.label}>Billed To:</Text>
          <Text style={styles.boldText}>{invoice.user_details.name}</Text>
          <Text style={styles.normalText}>{invoice.user_details.institution}</Text>
          <Text style={styles.normalText}>{invoice.user_details.address}</Text>
          <Text style={styles.normalText}>{invoice.user_details.phone}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={[styles.label, { textAlign: 'right' }]}>Payable To:</Text>
          <Text style={[styles.boldText, { textAlign: 'right' }]}>Zero Olympiad Org.</Text>
          <Text style={[styles.normalText, { textAlign: 'right' }]}>Registration & Operations</Text>
          <Text style={[styles.normalText, { textAlign: 'right' }]}>admin@zeroolympiad.com</Text>
        </View>
      </View>

      {/* Payment Highlight Card */}
      <View style={styles.paymentHighlight}>
        <View>
          <Text style={styles.label}>Trx ID</Text>
          <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{invoice.payment_details.trx_id}</Text>
        </View>
        <View>
          <Text style={styles.label}>Method</Text>
          <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{invoice.payment_details.method}</Text>
        </View>
        <View style={{ textAlign: 'right' }}>
          <Text style={styles.label}>Status</Text>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#166534' }}>SUCCESSFULLY PAID</Text>
        </View>
      </View>

      {/* Table Section */}
      <View style={styles.tableHeader}>
        <Text style={[styles.th, styles.colDesc]}>ITEM DESCRIPTION</Text>
        <Text style={[styles.th, styles.colQty]}>QTY</Text>
        <Text style={[styles.th, styles.colPrice]}>UNIT PRICE</Text>
        <Text style={[styles.th, styles.colTotal]}>TOTAL</Text>
      </View>

      {invoice.items.map((item, index) => (
        <View style={styles.tableRow} key={index}>
          <Text style={[styles.td, styles.colDesc]}>{item.description}</Text>
          <Text style={[styles.td, styles.colQty]}>{item.quantity}</Text>
          <Text style={[styles.td, styles.colPrice]}>{item.unit_price} Tk</Text>
          <Text style={[styles.td, styles.colTotal, { fontWeight: 'bold' }]}>{item.total} Tk</Text>
        </View>
      ))}

      {/* Total Section */}
      <View style={styles.totalWrapper}>
        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text style={{ color: colors.textHeader }}>Subtotal</Text>
            <Text style={{ fontWeight: 'bold' }}>{invoice.payment_details.amount} Tk</Text>
          </View>
          <View style={styles.grandTotal}>
            <Text style={styles.grandTotalLabel}>Grand Total</Text>
            <Text style={styles.grandTotalValue}>{invoice.payment_details.amount} Tk</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { fontWeight: 'bold', marginBottom: 4 }]}>
          Thank you for joining the mission towards a greener future.
        </Text>
        <Text style={styles.footerText}>
          This is a system-generated document and serves as an official proof of payment for the Zero Olympiad 2026.
          Any alterations to this document without prior authorization will render it invalid.
        </Text>
      </View>
    </Page>
  </Document>
);

export default InvoiceDocument;