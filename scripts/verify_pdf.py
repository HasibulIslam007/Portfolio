import re
import sys

data = open("public/resume.pdf", "rb").read()
sys.stdout.write("=== first 400 bytes ===\n")
sys.stdout.write(repr(data[:400]) + "\n")

sys.stdout.write("\n=== content stream ===\n")
m = re.search(rb"stream\n(.*?)\nendstream", data, re.S)
sys.stdout.write(repr(m.group(1)[:300]) + "\n")

sys.stdout.write("\n=== objects ===\n")
for o in re.findall(rb"(\d+) 0 obj\n(.*?)\nendobj", data, re.S):
    sys.stdout.write(o[0].decode() + ": " + o[1][:120].decode("latin-1") + "\n")

sys.stdout.write("\n=== xref ===\n")
x = data.index(b"xref")
sys.stdout.write(repr(data[x : x + 220]) + "\n")