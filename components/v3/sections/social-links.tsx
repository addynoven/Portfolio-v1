import Link from "next/link";
import { socials } from "@/app/v3/constants";
import { Icons } from "@/components/v3/ui/icons";

export default function SocialLinks() {
	return (
		<div className="flex flex-wrap gap-2 mt-4">
			{socials.map(({ platform, handle, url }) => {
				const Icon = Icons[platform as keyof typeof Icons];
				return (
					<Link
						key={platform}
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						className="
                            group flex items-center gap-2 px-3 py-1.5
                            bg-card border
                            text-foreground/75 hover:text-foreground
                            hover:border-accent hover:bg-accent/5
                            transition-all duration-200 hover:-translate-y-px
                            text-sm font-mono select-none
                        "
						style={{
							borderColor: "var(--v3-card-border)",
							borderRadius: "10px",
						}}
					>
						<span className="text-foreground/60 group-hover:text-accent transition-colors duration-200 flex items-center justify-center">
							{Icon ? <Icon className="w-4 h-4" /> : null}
						</span>
						{handle}
					</Link>
				);
			})}
		</div>
	);
}
