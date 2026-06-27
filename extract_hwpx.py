import zipfile
import xml.etree.ElementTree as ET
import sys
import os

def extract_hwpx_text(filepath, output_path):
    try:
        with zipfile.ZipFile(filepath, 'r') as zf:
            xml_content = zf.read('Contents/section0.xml')
            
            # The namespace is usually http://www.hancom.co.kr/hwpml/2011/core
            # We can strip namespaces to make it easier
            import re
            xml_content = re.sub(b' xmlns="[^"]+"', b'', xml_content, count=1)
            
            root = ET.fromstring(xml_content)
            
            # Find all text elements. In hwpx, text is usually inside <t> tags.
            # However, we can just grab all text from elements iteratively
            texts = []
            for elem in root.iter():
                if elem.tag.endswith('t'):
                    if elem.text:
                        texts.append(elem.text)
                elif elem.tag.endswith('p'):
                    texts.append('\n')

            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(''.join(texts))
            print("Successfully extracted hwpx text.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    extract_hwpx_text(sys.argv[1], sys.argv[2])
