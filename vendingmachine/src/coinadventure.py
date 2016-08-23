from fpdf import FPDF

##-----------------------------------------------------------------------
#   Adventure
#
#   Basic PDF format for making an adventure
##-----------------------------------------------------------------------
class CoinAdventure(FPDF):
    def header(self):
        self.image("/home/pi/adventurevending/vendingmachine/printing/icon.jpg", 38, 0, 30, 30)
        self.ln(30)
    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.multi_cell(0, 5, "Adventure Vending 2016\nwww.lamearts.org", 0, 'C')
