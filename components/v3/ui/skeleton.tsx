export default function Skeleton({ className }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-foreground/5 rounded-lg ${className}`} />
    );
}



