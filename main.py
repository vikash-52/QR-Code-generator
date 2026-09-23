import qrcode

data = "Hello Vikash"

qr = qrcode.make(data)

qr.save("my_qr.png")

print("QR Code ban gaya!")