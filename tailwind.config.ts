import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ['class', 'class'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))',
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))',
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))',
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))',
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))',
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))',
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))',
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			black: '#000000',
  			ink: '#050505',
  			charcoal: '#0a0a0a',
  			graphite: '#111111',
  			carbon: '#1a1a1a',
  			ash: '#222222',
  			slate: '#333333',
   			'neon-purple': '#a855f7',
   			'cyber-pink': '#c026d3',
   			'laser-cyan': '#06b6d4',
   			'acid-green': '#10b981',
   			'neon-yellow': '#FFF700',
   			emerald: '#10b981',
   			'emerald-dim': 'rgba(16,185,129,0.12)',
   			'emerald-glow': 'rgba(16,185,129,0.4)',
   			'emerald-dark': '#059669',
   			'emerald-light': '#34d399',
   			teal: '#14b8a6',
   			'teal-dim': 'rgba(20,184,166,0.12)',
   			'teal-glow': 'rgba(20,184,166,0.4)',
   			'teal-dark': '#0d9488',
   			'teal-light': '#2dd4bf',
   			blue: '#3b82f6',
   			'blue-dim': 'rgba(59,130,246,0.12)',
   			'blue-glow': 'rgba(59,130,246,0.35)',
   			amber: '#f59e0b',
   			'amber-dim': 'rgba(245,158,11,0.12)',
   			red: '#ef4444',
   			'red-dim': 'rgba(239,68,68,0.12)',
   			'red-glow': 'rgba(239,68,68,0.35)',
   			glass: {
   				light: 'rgba(255,255,255,0.04)',
   				med: 'rgba(255,255,255,0.06)',
   				heavy: 'rgba(255,255,255,0.09)'
   			},
   			'border-med': 'rgba(255,255,255,0.12)',
   			'border-hi': 'rgba(255,255,255,0.2)'
   		},
   		backgroundImage: {
   			'emerald-gradient': 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
   			'emerald-dark-gradient': 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
   			'cyber-gradient': 'linear-gradient(135deg, #a855f7 0%, #c026d3 100%)',
   			'laser-gradient': 'linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)',
   			'dark-gradient': 'linear-gradient(135deg, #000000 0%, #050505 50%, #0a1a15 100%)',
   			'radial-emerald': 'radial-gradient(ellipse at center, rgba(16,185,129,0.15) 0%, transparent 70%)',
   			'radial-teal': 'radial-gradient(ellipse at center, rgba(20,184,166,0.1) 0%, transparent 70%)',
   			'radial-cyber': 'radial-gradient(ellipse at center, rgba(168,85,247,0.15) 0%, transparent 70%)'
   		},
  		spacing: {
  			'8': '8px',
  			'16': '16px',
  			'24': '24px',
  			'32': '32px',
  			'40': '40px',
  			'48': '48px',
  			'56': '56px',
  			'64': '64px'
  		},
  		fontFamily: {
  			display: [
  				'var(--font-orbitron)',
  				'system-ui',
  				'sans-serif'
  			],
  			body: [
  				'var(--font-space-grotesk)',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'var(--font-jetbrains)',
  				'ui-monospace',
  				'monospace'
  			]
  		},
  		borderRadius: {
  			sm: '2px',
  			md: '4px',
  			lg: '8px',
  			xl: '12px',
  			'2xl': '16px',
  			'3xl': '24px',
  			full: '9999px'
  		},
  		animation: {
  			'fade-up': 'fadeUp 0.6s ease-out both',
  			'scale-in': 'scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
  			shimmer: 'shimmer 3s linear infinite',
  			breathe: 'breathe 3s ease-in-out infinite',
  			'spin-slow': 'spin 2s linear infinite',
  			aurora: 'aurora 20s ease infinite',
  			electric: 'electric 2s ease infinite',
  			'bounce-glow': 'bounceGlow 1s ease infinite',
  			float: 'float 6s ease-in-out infinite',
  			pulseglow: 'pulseGlow 2s ease-in-out infinite',
  			ring: 'ring 8s linear infinite',
  			marquee: 'marquee 25s linear infinite',
  			'morph-blob': 'morphBlob 12s ease-in-out infinite',
  			'magnetic-pull': 'magnetPull 0.3s ease-out',
  			'text-reveal': 'textReveal 1s ease-out both',
  			'parallax-float': 'parallaxFloat 8s ease-in-out infinite',
  			'spring-bounce': 'springBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) both',
  			glitch: 'glitch 0.3s cubic-bezier(.25,.46,.45,.94) both infinite',
  			'neon-pulse': 'neonPulse 1.5s ease-in-out infinite alternate',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		keyframes: {
  			glitch: {
  				'0%': {
  					transform: 'translate(0)'
  				},
  				'20%': {
  					transform: 'translate(-2px, 2px)'
  				},
  				'40%': {
  					transform: 'translate(-2px, -2px)'
  				},
  				'60%': {
  					transform: 'translate(2px, 2px)'
  				},
  				'80%': {
  					transform: 'translate(2px, -2px)'
  				},
  				'100%': {
  					transform: 'translate(0)'
  				}
  			},
   			neonPulse: {
   				'from': {
   					boxShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #a855f7, 0 0 20px #a855f7'
   				},
   				'to': {
   					boxShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #c026d3, 0 0 40px #c026d3'
   				}
   			},
  			fadeUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(24px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			scaleIn: {
  				'0%': {
  					transform: 'scale(0)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				}
  			},
  			shimmer: {
  				'0%': {
  					backgroundPosition: '0 0'
  				},
  				'100%': {
  					backgroundPosition: '200% 0'
  				}
  			},
  			breathe: {
  				'0%,100%': {
  					opacity: '1',
  					boxShadow: '0 0 8px rgba(16,185,129,0.4)'
  				},
  				'50%': {
  					opacity: '0.6',
  					boxShadow: '0 0 16px rgba(16,185,129,0.4)'
  				}
  			},
  			aurora: {
  				'0%,100%': {
  					transform: 'translateX(0%) translateY(0%)'
  				},
  				'25%': {
  					transform: 'translateX(5%) translateY(-5%)'
  				},
  				'50%': {
  					transform: 'translateX(0%) translateY(-10%)'
  				},
  				'75%': {
  					transform: 'translateX(-5%) translateY(-5%)'
  				}
  			},
  			electric: {
  				'0%,100%': {
  					boxShadow: '0 0 5px #10b981, 0 0 10px #10b981, 0 0 15px #10b981'
  				},
  				'50%': {
  					boxShadow: '0 0 10px #10b981, 0 0 20px #10b981, 0 0 30px #10b981'
  				}
  			},
  			bounceGlow: {
  				'0%,100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			float: {
  				'0%,100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
  				}
  			},
  			pulseGlow: {
  				'0%,100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0.5'
  				}
  			},
  			ring: {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(360deg)'
  				}
  			},
  			marquee: {
  				'0%': {
  					transform: 'translateX(0%)'
  				},
  				'100%': {
  					transform: 'translateX(-100%)'
  				}
  			},
  			morphBlob: {
  				'0%,100%': {
  					borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
  				},
  				'25%': {
  					borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%'
  				},
  				'50%': {
  					borderRadius: '50% 60% 30% 60% / 40% 70% 50% 60%'
  				},
  				'75%': {
  					borderRadius: '60% 30% 60% 40% / 70% 50% 40% 60%'
  				}
  			},
  			magnetPull: {
  				'0%': {
  					transform: 'translate(0, 0)'
  				},
  				'100%': {
  					transform: 'var(--magnetic-translate, translate(0, 0))'
  				}
  			},
  			textReveal: {
  				'0%': {
  					clipPath: 'inset(0 100% 0 0)'
  				},
  				'100%': {
  					clipPath: 'inset(0 0% 0 0)'
  				}
  			},
  			parallaxFloat: {
  				'0%,100%': {
  					transform: 'translateY(0) rotate(0deg)'
  				},
  				'33%': {
  					transform: 'translateY(-15px) rotate(1deg)'
  				},
  				'66%': {
  					transform: 'translateY(10px) rotate(-1deg)'
  				}
  			},
  			springBounce: {
  				'0%': {
  					transform: 'scale(0.8)',
  					opacity: '0'
  				},
  				'50%': {
  					transform: 'scale(1.05)'
  				},
  				'100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		}
  	}
  },
  plugins: [],
};

export default config;
