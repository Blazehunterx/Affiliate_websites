import os
import re

def fix_dist_paths(base_dir):
    # Map subdirectories to their intended base path
    niches = [
        'saas', 'travel', 'pet', 'fintech', 'gaming', 'vpn', 
        'wfh', 'outdoor', 'smarthome', 'aiproductivity', 
        'fashion', 'electronics'
    ]
    
    for niche in niches:
        index_path = os.path.join(base_dir, niche, 'index.html')
        if os.path.exists(index_path):
            print(f"Fixing {index_path}...")
            with open(index_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 1. Inject <base> tag
            base_tag = f'<base href="/{niche}/">'
            if '<base' not in content:
                content = content.replace('<head>', f'<head>\n    {base_tag}')
            
            # 2. Ensure all relative paths in the built file become truly relative to the base
            # Pre-built Vite files use ./assets/
            
            with open(index_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Successfully fixed {niche}")

if __name__ == "__main__":
    dist_root = r"c:\Users\marvi\.gemini\antigravity\playground\orbital-aphelion\sites\site-00-agency-hub\dist"
    fix_dist_paths(dist_root)
