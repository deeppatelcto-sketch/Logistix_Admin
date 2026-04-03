import React, { useState } from "react";

// Section Component
const Section = ({ title, children }) => {
    const [open, setOpen] = useState(false);

    return (
        <div style={styles.section}>
            <div style={styles.sectionHeader} onClick={() => setOpen(!open)}>
                <span>{title}</span>
                <span>{open ? "▲" : "▼"}</span>
            </div>
            {open && <div style={styles.sectionBody}>{children}</div>}
        </div>
    );
};

// Main App
export default function App() {
    return (
        <div style={styles.pageWrapper}>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
            />
            <div style={styles.container}>
                <h1 style={styles.heading}>Package Guide</h1>

                <Section title="Quantitative Measures">
                    <div style={styles.iconGrid}>
                        {[
                            {
                                icon: "fa-ruler",
                                title: "Dimension",
                                points: [
                                    "Helps in selection of appropriate size of boxes/flyers",
                                    "Minimize inventory & cost"
                                ],
                            },
                            {
                                icon: "fa-weight-hanging",
                                title: "Weight",
                                points: [
                                    "Optimize for the minimum strength required for box",
                                    "Ensures safety of item"
                                ],
                            },
                            {
                                icon: "fa-box",
                                title: "Fragility",
                                points: [
                                    "Helps in selection of appropriate box strength",
                                    "cushioning requirements"
                                ],
                            },
                            {
                                icon: "fa-tint",
                                title: "Physical State",
                                points: [
                                    "Identifies the need for any special requirements for the protection of item",
                                    "E.g.: Liquid products need additional leak proofing"
                                ],
                            },
                        ].map((item, i) => (
                            <div key={i} style={styles.iconBox}>
                                <i className={`fas ${item.icon}`} style={styles.icon}></i>
                                <h4 style={styles.iconTitle}>{item.title}</h4>
                                <ul style={styles.iconList}>
                                    {item.points.map((pt, idx) => (
                                        <li key={idx}>{pt}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section title="Section of Boxes">
                    <h3 style={styles.h2material}>Material</h3>
                    <div style={styles.iconGrid}>
                        <div style={styles.iconBox}>
                            <i className="fas fa-box-open" style={styles.icon}></i>
                            <h4>Good Box ✅</h4>
                        </div>
                        <div style={styles.iconBox}>
                            <i className="fas fa-box-open" style={styles.icon}></i>
                            <h4>Bad Box ❌</h4>
                        </div>
                    </div>
                    <ul style={styles.li}>
                        <li>Use corrugated boxes of 3 ply for products below 4Kg and not fragile</li>
                        <li>Use corrugated boxes of 5 ply for products above 4Kg and fragile</li>
                        <li>Use tamper evident boxes for high value items (Cost above Rs. 7000)</li>
                        <li>Ensure the material used can withstand the required edge crush and burst factor load</li>
                        <li>Optimize the size of the boxes as per the product dimensions</li>
                        <li>The box should not be too small or too big for the item shipped</li>
                        <li>Inspect the box for holes, tears, crushed edges and sturdiness. Avoid poor quality boxes</li>
                    </ul>

                    <h3 style={styles.h2material}>Size</h3>
                    <div style={styles.iconGrid}>
                        <div style={styles.iconBox}>
                            <i className="fas fa-box-open" style={styles.icon}></i>
                            <h4>Size of the box as per item dimension</h4>
                        </div>
                        <div style={styles.iconBox}>
                            <i className="fas fa-box-open" style={styles.icon}></i>
                            <h4>Box is small compared to the item to be shipped</h4>
                        </div>
                    </div>
                    <ul style={styles.li}>
                        <li>Optimize the size of the boxes as per the product dimensions</li>
                        <li>The box should not be too small or too big for the item shipped</li>
                    </ul>

                    <h3>Quick Check</h3>
                    <ul>
                        <li>Inspect the box for holes, tears, crushed edges and sturdiness</li>
                    </ul>
                </Section>

                <Section title="Flyers / Polybags">
                    <p>Flyers are quick and handy in packing of flexible items such as apparels or can be used as an added protection for the safety of the shipment from external fluids, tampering etc.</p>
                    <br></br>
                    <div style={styles.iconBox}>
                        <i className="fas fa-layer-group" style={styles.icon}></i>
                        <h4>Strong Flyer ✅</h4>
                    </div>

                    <br></br>

                    <div style={styles.iconGrid}>

                    </div>
                    <h3>Quick Check</h3>
                    <ul>
                        <li>Inspect the polybag for any damagesd</li>
                        <li>Ensure the opening is sealed properly after the packing of item</li>

                    </ul>
                    <br></br>
                    <h3>Material</h3>
                    <ul>
                        <li>Choose 60-80microns hot-melt glue adhesive LDPE polybags.</li>
                        <li>Use tamper evident polybags for high value items (Cost above Rs.7000)</li>

                    </ul>
                </Section>

                <Section title="Packing of items">
                    {/* <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>Material</th>
                                <th>Cushioning</th>
                                <th>Void Fill</th>
                                <th>Protection</th>
                                <th>Divider</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ["Bubble Wrap", "✅", "✅", "✅", ""],
                                ["Foam Sheet", "✅", "✅", "✅", ""],
                                ["Air Bag", "", "✅", "", ""],
                                ["Shredded Paper", "", "✅", "", ""],
                                ["Corrugated Insert", "", "✅", "", "✅"],
                            ].map((row, i) => (
                                <tr key={i}>
                                    {row.map((cell, j) => (
                                        <td key={j}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table> */}
                    <p>Packing an item involves leak proofing, cushioning, placing of the item and filling of the voids in the box. Enough cushioning needs to be provided to ensure no loads are transferred to the item.</p>

                    <h3 style={styles.h2material}>Material</h3>
                    <div style={styles.iconGrid}>
                        <div style={styles.iconBox}>
                            <i className="fas fa-box-open" style={styles.icon}></i>
                            <h4>Bubble Wrap</h4>
                        </div>
                        <div style={styles.iconBox}>
                            <i className="fas fa-box-open" style={styles.icon}></i>
                            <h4>Foam Sheet</h4>
                        </div>
                    </div>
                    <ul style={styles.li}>
                        <li>Choose 60-80microns hot-melt glue adhesive LDPE polybags.</li>
                        <li>Use tamper evident polybags for high value items (Cost above Rs.7000)</li>

                    </ul>

                </Section>

                <Section title="Internal Packing Material vs Functionality">
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Material</th>
                                <th style={styles.th}>Cushioning</th>
                                <th style={styles.th}>Void Fill</th>
                                <th style={styles.th}>Protection</th>
                                <th style={styles.th}>Divider</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ["Bubble Wrap", "✅", "✅", "✅", ""],
                                ["Foam Sheet", "✅", "✅", "✅", ""],
                                ["Air Bag", "", "✅", "", ""],
                                ["Shredded Paper", "", "✅", "", ""],
                                ["Crumbled Paper", "", "✅", "", ""],

                                ["Corrugated Insert", "", "✅", "", "✅"],
                            ].map((row, i) => (
                                <tr key={i} style={styles.tr}>
                                    {row.map((cell, j) => (
                                        <td key={j} style={styles.td}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Section>

                <Section title="Sealing OS Shipment">

                    <p>Sealing ensures that the properly packed item is secured and intact inside the box throughout the journey of the shipment.</p>

                    <h3 style={styles.h2material}>Tape</h3>
                    <div style={styles.iconGrid}>
                        <div style={styles.iconBox}>
                            <i className="fas fa-box-open" style={styles.icon}></i>
                            <h4>Tapping for light weight Shipment</h4>
                        </div>
                        <div style={styles.iconBox}>
                            <i className="fas fa-box-open" style={styles.icon}></i>
                            <h4>H taping for heavy weight shipment</h4>
                        </div>
                    </div>
                    <ul style={styles.li}>
                        <li>Use Pressure Sensitive Tapes such as BOPP.</li>
                    </ul>
                    <h3>Locations</h3>
                    <ul>
                        <li>Seal the center seam of the top and bottom of the box.</li>
                        <li>For heavy shipments, apply H-Taping by sealing both the center and edge seams on the box.</li>

                    </ul>

                </Section>


                <Section title="Shipment Labelling">

                    <p>Proper labeling is crucial for faster and safe handling of the shipment in reaching the intended destination.</p>

                    <h3 style={styles.h2material}>Essential Data</h3>

                    <ul style={styles.li}>
                        <li>Barcode height (min. size : 8 mm)</li>
                        <li>Waybill number and Barcode (min. size : 8 MIL, 1MIL= 0.2032mm)</li>
                        <li>Order number and Barcode (min. size : 8 MIL, 1MIL= 0.2032mm)</li>
                        <li>Consignee address (min. font size: 8pts, Calibri body)</li>
                        <li>Return address (min. font size: 8pts, Calibri body)</li>
                        <li>Retail/Tax Invoice</li>
                    </ul>
                    <h3>Locations</h3>
                    <ul>
                        <li>Seal the center seam of the top and bottom of the box.</li>
                        <li>For heavy shipments, apply H-Taping by sealing both the center and edge seams on the box.</li>
                    </ul>
                    <h3 style={styles.h2material}>Location of Label</h3>
                    <div style={styles.iconBox}>
                        <i className="fas fa-layer-group" style={styles.icon}></i>
                    </div>
                    <br></br>
                    <p>Proper labeling is crucial for faster and safe handling of the shipment in reaching the intended destination.</p>
                    <br></br>
                    <li>Paste the label on a seamless flat face of the box/flyer</li>
                    <li>Paste the label away from seams or edges of the box</li>
                    <li>Readability of barcode is important for faster and correct processing of shipments</li>
                    <li>In flyers/polybags, all the essential data on labels should be visible and the label should be placed flat</li>
                    <li>The pocket containing the label in flyer should be taped at the opening to avoid the loss of label</li>
                    <li>Thermal printed labels are strongly recommended over regular labels</li>


                </Section>

                <Section title="Special Handeling Labels">
                    <br></br>
                    <p>Proper labeling is crucial for faster and safe handling of the shipment in reaching the intended destination.</p>
                    <br></br>

                    <h3>Common categories</h3>
                    <br></br>
                    <div style={styles.iconGrid}>
                        <div style={styles.iconBox1}>
                            <i className="fas fa-box-open" style={styles.icon}></i>
                            <h6>Fragile</h6>
                        </div>
                        <div style={styles.iconBox1}>
                            <i className="fas fa-box-open" style={styles.icon}></i>
                            <h6>This side up</h6>
                        </div>
                        <div style={styles.iconBox1}>
                            <i className="fas fa-box-open" style={styles.icon}></i>
                            <h6>Contain Food</h6>
                        </div><div style={styles.iconBox1}>
                            <i className="fas fa-box-open" style={styles.icon}></i>
                            <h6>corrosive Substance</h6>
                        </div><div style={styles.iconBox1}>
                            <i className="fas fa-box-open" style={styles.icon}></i>
                            <h6>Flammable Liquid</h6>
                        </div><div style={styles.iconBox1}>
                            <i className="fas fa-box-open" style={styles.icon}></i>
                            <h6>Caution- Don't delivery battery if broken</h6>
                        </div>
                    </div>
                    <ul style={styles.li}>
                        <li>Fragile</li>
                        <li>Perishables</li>
                        <li>Dangerous goods</li>
                        <li>Package orientation</li>
                        <li>Keep dry</li>
                    </ul>

                </Section>

                <Section title="Product Categories">
                    <br></br>
                    <p>Proper labeling is crucial for faster and safe handling of the shipment in reaching the intended destination.</p>
                    <br></br>

                    <h3>Electronic items</h3>
                    <div style={styles.iconGrid}>
                        <div style={styles.iconBox2}>
                            <i className="fas fa-box-open" style={styles.icon2}></i>
                            <h5>Mobile phones & accessories</h5>
                        </div>
                        <div style={styles.iconBox2}>
                            <i className="fas fa-box-open" style={styles.icon2}></i>
                            <h5>Tablets</h5>
                        </div>
                        <div style={styles.iconBox2}>
                            <i className="fas fa-box-open" style={styles.icon2}></i>
                            <h5>Laptop & Computer accessories</h5>
                        </div>
                    </div>
                    <br></br>

                    <h3>Electrical items</h3>


                    <div style={styles.iconGrid}>
                        <div style={styles.iconBox2}>
                            <i className="fas fa-box-open" style={styles.icon2}></i>
                            <h5>Small home appliances</h5>
                        </div>
                        <div style={styles.iconBox2}>
                            <i className="fas fa-box-open" style={styles.icon2}></i>
                            <h5>Power equipment</h5>
                        </div>
                        <div style={styles.iconBox2}>
                            <i className="fas fa-box-open" style={styles.icon2}></i>
                            <h5>Laptop & Computer accessories</h5>
                        </div>
                    </div>
                    <br></br>

                    <h3>Fragile Items</h3>

                    <div style={styles.iconGrid}>
                        <div style={styles.iconBox2}>
                            <i className="fas fa-box-open" style={styles.icon2}></i>
                            <h5>Glassware</h5>
                        </div>
                        <div style={styles.iconBox2}>
                            <i className="fas fa-box-open" style={styles.icon2}></i>
                            <h5>Crockery</h5>
                        </div>
                        <div style={styles.iconBox2}>
                            <i className="fas fa-box-open" style={styles.icon2}></i>
                            <h5>Home decor</h5>
                        </div>
                    </div>
                    <br></br>
                    <h3>Apparels</h3>

                    <div style={styles.iconGrid}>
                        <div style={styles.iconBox2}>
                            <i className="fas fa-box-open" style={styles.icon2}></i>
                            <h5>Flexible Packaging</h5>
                        </div>
                        <div style={styles.iconBox2}>
                            <i className="fas fa-box-open" style={styles.icon2}></i>
                            <h5>Rigid Packaging</h5>
                        </div>

                    </div>
                    <br></br>

                    <h3>Fashion Accessories</h3>
                    <div style={styles.iconGrid}>
                        <div style={styles.iconBox2}>
                            <i className="fas fa-box-open" style={styles.icon2}></i>
                            <h5>Jewellery</h5>
                        </div>
                        <div style={styles.iconBox2}>
                            <i className="fas fa-box-open" style={styles.icon2}></i>
                            <h5>Watches</h5>
                        </div>

                    </div>
                    <br></br>

                    <h3>Liquid Items</h3>

                    <div style={styles.iconGrid}>
                        <div style={styles.iconBox2}>
                            <i className="fas fa-box-open" style={styles.icon2}></i>
                            <h5>Beauty & Personal Care</h5>
                        </div>
                        <div style={styles.iconBox2}>
                            <i className="fas fa-box-open" style={styles.icon2}></i>
                            <h5>Food Products, Medicines</h5>
                        </div>
                        <div style={styles.iconBox2}>
                            <i className="fas fa-box-open" style={styles.icon2}></i>
                            <h5>Automotive</h5>
                        </div>
                    </div>
                    <br></br>

                    <h3>Others</h3>
                    <div style={styles.iconGrid}>
                        <div style={styles.iconBox2}>
                            <i className="fas fa-box-open" style={styles.icon2}></i>
                            <h5>Food products, Medicines</h5>
                        </div>
                        <div style={styles.iconBox2}>
                            <i className="fas fa-box-open" style={styles.icon2}></i>
                            <h5>Books & Stationery</h5>
                        </div>

                    </div>




                </Section>


            </div>
        </div>
    );
}

// Styles

const styles = {
  pageWrapper: {
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    padding: "40px 0",
    fontFamily: "'Inter', sans-serif",
  },
  container: {
    background: "#ffffff",
    padding: "30px 20px",
    maxWidth: "1300px",
    margin: "auto",
    borderRadius: "16px",
    boxShadow: "0 12px 24px rgba(0,0,0,0.05)",
  },
  heading: {
    textAlign: "center",
    color: "#4A90E2",
    marginBottom: "32px",
    fontSize: "2.4rem",
    fontWeight: 700,
  },
  section: {
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    marginBottom: "24px",
    overflow: "hidden",
  },
  sectionHeader: {
    background: "#fcfdff",
    padding: "18px 24px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: 600,
    fontSize: "1.15rem",
    borderBottom: "1px solid #e0e0e0",
  },
  sectionBody: {
    padding: "24px",
    background: "#f7f9fc",
    overflowX: "auto",
  },
  iconGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "20px",
  },
  iconBox: {
    flex: "1 1 calc(25% - 20px)",
    minWidth: "200px",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
  },
  iconBox1: {
    flex: "1 1 calc(25% - 20px)",
    maxWidth: "175px",
    padding: "20px",
    textAlign: "center",
  },
  iconBox2: {
    flex: "1 1 calc(33.33% - 20px)",
    minWidth: "250px",
    padding: "20px",
    textAlign: "center",
  },
  icon: {
    fontSize: "48px",
    color: "#4A90E2",
    marginBottom: "16px",
  },
  icon2: {
    fontSize: "80px",
    color: "#4A90E2",
    marginBottom: "16px",
  },
  iconTitle: {
    fontSize: "1.1rem",
    fontWeight: 600,
    marginBottom: "12px",
    color: "#2c3e50",
  },
  iconList: {
    textAlign: "left",
    paddingLeft: "20px",
    fontSize: "14px",
    color: "#4b5563",
  },
  h2material: {
    margin: "20px 0 10px",
    fontSize: "1.2rem",
    fontWeight: 600,
    color: "#1f2937",
  },
  li: {
    fontSize: "14px",
    lineHeight: "1.6",
    margin: "8px 0",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    fontSize: "14px",
  },
  th: {
    backgroundColor: "#5dade2",
    color: "white",
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
    backgroundColor: "#fdfdfd",
    textAlign: "center",
  },
  tr: {
    transition: "background-color 0.2s",
  },
};

// ✅ Responsive tweaks:
styles["@media (max-width: 1024px)"] = {
  iconBox: { flex: "1 1 calc(50% - 20px)" },
  iconBox2: { flex: "1 1 calc(50% - 20px)" },
};
styles["@media (max-width: 640px)"] = {
  iconGrid: { flexDirection: "column", alignItems: "center" },
  iconBox: { width: "100%", minWidth: "unset" },
  iconBox2: { width: "100%", minWidth: "unset" },
  table: { display: "block" },
};