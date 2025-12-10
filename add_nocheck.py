
import os

directory = '/home/neon/programs/web_dev/Portfolio-v1/components/reactbits'
exclude_files = ['Aurora.tsx', 'Squares.tsx', 'Waves.tsx', 'Threads.tsx']

for filename in os.listdir(directory):
    if filename.endswith('.tsx') and filename not in exclude_files:
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r') as f:
            content = f.read()
        
        if not content.startswith('// @ts-nocheck'):
            print(f'Adding @ts-nocheck to {filename}')
            with open(filepath, 'w') as f:
                f.write('// @ts-nocheck\n' + content)
