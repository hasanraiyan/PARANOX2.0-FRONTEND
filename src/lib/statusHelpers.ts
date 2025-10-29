import { Shield, CheckCircle, AlertTriangle, Bell, Users, Eye } from "lucide-react";
import { LucideIcon } from "lucide-react";

/**
 * Get the color class for a given status
 * Used in phishing detection and alerts
 */
export function getStatusColor(status: string): string {
  switch (status) {
    case 'safe':
      return 'text-accent-password';
    case 'suspicious':
      return 'text-accent-safety';
    case 'dangerous':
      return 'text-accent-phishing';
    case 'blocked':
      return 'bg-accent-phishing/20 text-accent-phishing';
    case 'flagged':
      return 'bg-accent-safety/20 text-accent-safety';
    case 'resolved':
      return 'bg-accent-password/20 text-accent-password';
    default:
      return 'text-white';
  }
}

/**
 * Get the icon for a given status
 * Used in phishing detection and alerts
 */
export function getStatusIcon(status: string): LucideIcon {
  switch (status) {
    case 'safe':
      return CheckCircle;
    case 'suspicious':
      return AlertTriangle;
    case 'dangerous':
      return Shield;
    default:
      return Shield;
  }
}

/**
 * Get the color class for a given alert type
 * Used in alerts history
 */
export function getTypeColor(type: string): string {
  switch (type) {
    case 'phishing':
      return 'text-accent-phishing';
    case 'password':
      return 'text-accent-password';
    case 'safety':
      return 'text-accent-safety';
    case 'system':
      return 'text-primary';
    default:
      return 'text-white';
  }
}

/**
 * Get the icon for a given alert type
 * Used in alerts history
 */
export function getTypeIcon(type: string): LucideIcon {
  switch (type) {
    case 'phishing':
      return Shield;
    case 'password':
      return CheckCircle;
    case 'safety':
      return Eye;
    case 'system':
      return Bell;
    default:
      return Bell;
  }
}

/**
 * Get the border color class for a given severity level
 * Used in alerts history
 */
export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'critical':
      return 'border-l-accent-phishing';
    case 'high':
      return 'border-l-accent-phishing/70';
    case 'medium':
      return 'border-l-accent-safety';
    case 'low':
      return 'border-l-accent-password';
    default:
      return 'border-l-muted';
  }
}

/**
 * Get the color class for password strength
 * Used in password checker
 */
export function getStrengthColor(strength: string): string {
  switch (strength) {
    case 'weak':
      return 'text-accent-phishing';
    case 'medium':
      return 'text-accent-safety';
    case 'strong':
      return 'text-accent-password';
    case 'very-strong':
      return 'text-primary';
    default:
      return 'text-white';
  }
}

/**
 * Get the progress bar color class for password strength
 * Used in password checker
 */
export function getProgressColor(strength: string): string {
  switch (strength) {
    case 'weak':
      return 'bg-accent-phishing';
    case 'medium':
      return 'bg-accent-safety';
    case 'strong':
      return 'bg-accent-password';
    case 'very-strong':
      return 'bg-primary';
    default:
      return 'bg-gray-500';
  }
}
