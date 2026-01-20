"use client";

import React, { useState } from "react";
import {
  Button,
  Badge,
  Spinner,
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  Container,
} from "@/components/atoms";
import { EmptyState } from "@/components/molecules";
import { MentorCardV2 } from "@/app/mentor-card/components";
import { mapApiMentorToCardMentor } from "@/lib/utils";
import type { Mentor as ApiMentor } from "@/lib/api";
import { Check, Copy, ArrowRight, Search, Plus, Trash2 } from "lucide-react";

// Color swatch component
function ColorSwatch({
  name,
  value,
  className,
  textLight = false,
}: {
  name: string;
  value: string;
  className: string;
  textLight?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copyToClipboard}
      className={`${className} h-20 rounded-lg flex flex-col items-start justify-end p-3 transition-transform hover:scale-105 cursor-pointer relative group`}
    >
      <span
        className={`text-xs font-medium ${textLight ? "text-white" : "text-text-primary"}`}
      >
        {name}
      </span>
      <span
        className={`text-[10px] font-mono ${textLight ? "text-white/70" : "text-text-tertiary"}`}
      >
        {value}
      </span>
      {copied && (
        <span className="absolute top-2 right-2 text-xs bg-black/80 text-white px-2 py-0.5 rounded">
          Copied!
        </span>
      )}
    </button>
  );
}

// Section wrapper
function Section({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="text-heading-xl text-text-primary mb-6 pb-2 border-b border-border">
        {title}
      </h2>
      {children}
    </section>
  );
}

// Code block component
function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative group">
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
        <code>{children}</code>
      </pre>
      <button
        onClick={copy}
        className="absolute top-2 right-2 p-1.5 rounded bg-gray-700 hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-300" />
        )}
      </button>
    </div>
  );
}

export default function DesignSystemPage() {
  const navItems = [
    { id: "colors", label: "Colors" },
    { id: "typography", label: "Typography" },
    { id: "spacing", label: "Spacing" },
    { id: "buttons", label: "Buttons" },
    { id: "badges", label: "Badges" },
    { id: "spinners", label: "Spinners" },
    { id: "skeletons", label: "Skeletons" },
    { id: "empty-states", label: "Empty States" },
    { id: "mentor-card", label: "Mentor Card" },
  ];

  // Sample mentor data for design system (API format)
  const sampleMentor: ApiMentor = {
    _id: "sample-123",
    name: "Rahul Kumar",
    profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    currentCompany: "Google",
    role: "SDE-2",
    college: "IIT Delhi",
    grad_year: 2022,
    tagline: "Helping students crack FAANG interviews with real-world insights",
    branch: "Computer Science",
    linkedin_url: "https://linkedin.com/in/rahul",
    insta_url: "https://instagram.com/rahul",
  };

  const sampleMentorMinimal: ApiMentor = {
    _id: "sample-456",
    name: "Priya Singh",
    profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    currentCompany: "Amazon",
    role: "SDE-3",
    college: "IIT Bombay",
    grad_year: 2021,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-secondary-lightest to-background border-b border-border">
        <Container size="xl" className="py-12">
          <Badge variant="secondary" className="mb-4">
            Design System
          </Badge>
          <h1 className="text-display-md text-text-primary mb-4">
            PreTest Design System
          </h1>
          <p className="text-body-lg text-text-secondary max-w-2xl">
            A comprehensive guide to our design tokens, components, and patterns.
            Use this reference to build consistent, beautiful interfaces.
          </p>
        </Container>
      </div>

      <Container size="xl" className="py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-48 flex-shrink-0">
            <nav className="sticky top-20 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-background-subtle rounded-md transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-16 min-w-0">
            {/* Colors */}
            <Section title="Colors" id="colors">
              <div className="space-y-8">
                {/* Primary */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-3">
                    Primary (Blue - Trust)
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <ColorSwatch
                      name="primary"
                      value="#2563eb"
                      className="bg-primary"
                      textLight
                    />
                    <ColorSwatch
                      name="primary-light"
                      value="#3b82f6"
                      className="bg-primary-light"
                      textLight
                    />
                    <ColorSwatch
                      name="primary-lighter"
                      value="#60a5fa"
                      className="bg-primary-lighter"
                      textLight
                    />
                    <ColorSwatch
                      name="primary-lightest"
                      value="#dbeafe"
                      className="bg-primary-lightest"
                    />
                    <ColorSwatch
                      name="primary-dark"
                      value="#1d4ed8"
                      className="bg-primary-dark"
                      textLight
                    />
                  </div>
                </div>

                {/* Secondary */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-3">
                    Secondary (Orange - Action/CTA)
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <ColorSwatch
                      name="secondary"
                      value="#f97316"
                      className="bg-secondary"
                      textLight
                    />
                    <ColorSwatch
                      name="secondary-light"
                      value="#fb923c"
                      className="bg-secondary-light"
                      textLight
                    />
                    <ColorSwatch
                      name="secondary-lighter"
                      value="#fdba74"
                      className="bg-secondary-lighter"
                    />
                    <ColorSwatch
                      name="secondary-lightest"
                      value="#fff7ed"
                      className="bg-secondary-lightest"
                    />
                    <ColorSwatch
                      name="secondary-dark"
                      value="#ea580c"
                      className="bg-secondary-dark"
                      textLight
                    />
                  </div>
                </div>

                {/* Semantic */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-3">
                    Semantic States
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <ColorSwatch
                      name="success"
                      value="#22c55e"
                      className="bg-success"
                      textLight
                    />
                    <ColorSwatch
                      name="info"
                      value="#3b82f6"
                      className="bg-info"
                      textLight
                    />
                    <ColorSwatch
                      name="warning"
                      value="#eab308"
                      className="bg-warning"
                    />
                    <ColorSwatch
                      name="error"
                      value="#ef4444"
                      className="bg-error"
                      textLight
                    />
                  </div>
                </div>

                {/* Text Colors */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-3">
                    Text & Neutrals
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <ColorSwatch
                      name="text-primary"
                      value="#111827"
                      className="bg-text-primary"
                      textLight
                    />
                    <ColorSwatch
                      name="text-secondary"
                      value="#4b5563"
                      className="bg-text-secondary"
                      textLight
                    />
                    <ColorSwatch
                      name="text-tertiary"
                      value="#9ca3af"
                      className="bg-text-tertiary"
                    />
                    <ColorSwatch
                      name="border"
                      value="#e5e7eb"
                      className="bg-border"
                    />
                    <ColorSwatch
                      name="background-subtle"
                      value="#f9fafb"
                      className="bg-background-subtle border border-border"
                    />
                  </div>
                </div>
              </div>
            </Section>

            {/* Typography */}
            <Section title="Typography" id="typography">
              <div className="space-y-8">
                {/* Display */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">
                    Display Sizes
                  </h3>
                  <div className="space-y-4 bg-background-subtle p-6 rounded-xl">
                    <div>
                      <span className="text-label-sm text-text-tertiary">display-xl (72px)</span>
                      <p className="text-display-xl text-text-primary">The quick brown fox</p>
                    </div>
                    <div>
                      <span className="text-label-sm text-text-tertiary">display-lg (60px)</span>
                      <p className="text-display-lg text-text-primary">The quick brown fox</p>
                    </div>
                    <div>
                      <span className="text-label-sm text-text-tertiary">display-md (48px)</span>
                      <p className="text-display-md text-text-primary">The quick brown fox</p>
                    </div>
                    <div>
                      <span className="text-label-sm text-text-tertiary">display-sm (36px)</span>
                      <p className="text-display-sm text-text-primary">The quick brown fox</p>
                    </div>
                  </div>
                </div>

                {/* Headings */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">
                    Heading Sizes
                  </h3>
                  <div className="space-y-3 bg-background-subtle p-6 rounded-xl">
                    <div className="flex items-baseline gap-4">
                      <span className="text-label-sm text-text-tertiary w-32">heading-xl (32px)</span>
                      <p className="text-heading-xl text-text-primary">Heading XL</p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <span className="text-label-sm text-text-tertiary w-32">heading-lg (24px)</span>
                      <p className="text-heading-lg text-text-primary">Heading LG</p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <span className="text-label-sm text-text-tertiary w-32">heading-md (20px)</span>
                      <p className="text-heading-md text-text-primary">Heading MD</p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <span className="text-label-sm text-text-tertiary w-32">heading-sm (18px)</span>
                      <p className="text-heading-sm text-text-primary">Heading SM</p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">
                    Body & Label Sizes
                  </h3>
                  <div className="space-y-3 bg-background-subtle p-6 rounded-xl">
                    <div className="flex items-baseline gap-4">
                      <span className="text-label-sm text-text-tertiary w-28">body-xl (20px)</span>
                      <p className="text-body-xl text-text-secondary">Body text extra large</p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <span className="text-label-sm text-text-tertiary w-28">body-lg (18px)</span>
                      <p className="text-body-lg text-text-secondary">Body text large</p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <span className="text-label-sm text-text-tertiary w-28">body-md (16px)</span>
                      <p className="text-body-md text-text-secondary">Body text medium (default)</p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <span className="text-label-sm text-text-tertiary w-28">body-sm (14px)</span>
                      <p className="text-body-sm text-text-secondary">Body text small</p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <span className="text-label-sm text-text-tertiary w-28">body-xs (12px)</span>
                      <p className="text-body-xs text-text-secondary">Body text extra small</p>
                    </div>
                  </div>
                </div>

                <CodeBlock>{`// Usage
<h1 className="text-display-lg">Hero Title</h1>
<h2 className="text-heading-xl">Section Title</h2>
<p className="text-body-md text-text-secondary">Body text</p>
<span className="text-label-sm text-text-tertiary">Label</span>`}</CodeBlock>
              </div>
            </Section>

            {/* Spacing */}
            <Section title="Spacing" id="spacing">
              <div className="space-y-6">
                <p className="text-body-md text-text-secondary">
                  Consistent spacing scale based on 4px increments.
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    { name: "space-1", value: "4px", size: "w-1" },
                    { name: "space-2", value: "8px", size: "w-2" },
                    { name: "space-3", value: "12px", size: "w-3" },
                    { name: "space-4", value: "16px", size: "w-4" },
                    { name: "space-5", value: "20px", size: "w-5" },
                    { name: "space-6", value: "24px", size: "w-6" },
                    { name: "space-8", value: "32px", size: "w-8" },
                    { name: "space-10", value: "40px", size: "w-10" },
                    { name: "space-12", value: "48px", size: "w-12" },
                  ].map((space) => (
                    <div key={space.name} className="flex items-center gap-3">
                      <div className={`${space.size} h-8 bg-secondary rounded`} />
                      <div>
                        <p className="text-body-sm text-text-primary font-medium">
                          {space.name}
                        </p>
                        <p className="text-body-xs text-text-tertiary">{space.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-heading-sm text-text-primary mb-3">Border Radius</h3>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { name: "sm", value: "4px" },
                      { name: "md", value: "8px" },
                      { name: "lg", value: "12px" },
                      { name: "xl", value: "16px" },
                      { name: "2xl", value: "24px" },
                      { name: "full", value: "9999px" },
                    ].map((radius) => (
                      <div key={radius.name} className="text-center">
                        <div
                          className={`w-16 h-16 bg-secondary rounded-${radius.name} mb-2`}
                        />
                        <p className="text-body-xs text-text-primary">{radius.name}</p>
                        <p className="text-body-xs text-text-tertiary">{radius.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* Buttons */}
            <Section title="Buttons" id="buttons">
              <div className="space-y-8">
                {/* Variants */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">Variants</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="danger-ghost">Danger Ghost</Button>
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">Sizes</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="xs">Extra Small</Button>
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                    <Button size="icon" variant="outline">
                      <Search className="w-4 h-4" />
                    </Button>
                    <Button size="icon-sm" variant="outline">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-body-xs text-text-tertiary mt-3">
                    Sizes: xs | sm | md | lg | xl | icon (40px) | icon-sm (32px)
                  </p>
                </div>

                {/* Rounded */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">Rounded</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button rounded="default">Default</Button>
                    <Button rounded="lg">Large</Button>
                    <Button rounded="full">Full</Button>
                  </div>
                </div>

                {/* With Icons */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">With Icons</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button leftIcon={<Search className="w-4 h-4" />}>Search</Button>
                    <Button rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Continue
                    </Button>
                    <Button
                      leftIcon={<Plus className="w-4 h-4" />}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Add Item
                    </Button>
                  </div>
                </div>

                {/* States */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">States</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button>Default</Button>
                    <Button isLoading>Loading</Button>
                    <Button isLoading loadingText="Saving...">
                      Save
                    </Button>
                    <Button disabled>Disabled</Button>
                  </div>
                </div>

                <CodeBlock>{`import { Button } from "@/components/atoms";

// Variants: primary | secondary | outline | ghost | danger | danger-ghost
// Sizes: xs | sm | md | lg | xl | icon | icon-sm
// Rounded: default | lg | full

<Button variant="primary" size="md" rounded="default">
  Click me
</Button>

<Button
  isLoading
  loadingText="Saving..."
  leftIcon={<Save className="w-4 h-4" />}
>
  Save
</Button>

// Icon buttons
<Button size="icon" variant="outline">
  <Trash className="w-4 h-4" />
</Button>`}</CodeBlock>
              </div>
            </Section>

            {/* Badges */}
            <Section title="Badges" id="badges">
              <div className="space-y-8">
                {/* Variants */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">Variants</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="info">Info</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">Sizes</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge size="sm">Small</Badge>
                    <Badge size="md">Medium</Badge>
                    <Badge size="lg">Large</Badge>
                  </div>
                </div>

                <CodeBlock>{`import { Badge } from "@/components/atoms";

<Badge variant="success" size="md">Active</Badge>
<Badge variant="warning">Pending</Badge>`}</CodeBlock>
              </div>
            </Section>

            {/* Spinners */}
            <Section title="Spinners" id="spinners">
              <div className="space-y-8">
                {/* Sizes */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">Sizes</h3>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <Spinner size="xs" />
                      <p className="text-body-xs text-text-tertiary mt-2">xs (12px)</p>
                    </div>
                    <div className="text-center">
                      <Spinner size="sm" />
                      <p className="text-body-xs text-text-tertiary mt-2">sm (16px)</p>
                    </div>
                    <div className="text-center">
                      <Spinner size="md" />
                      <p className="text-body-xs text-text-tertiary mt-2">md (24px)</p>
                    </div>
                    <div className="text-center">
                      <Spinner size="lg" />
                      <p className="text-body-xs text-text-tertiary mt-2">lg (32px)</p>
                    </div>
                    <div className="text-center">
                      <Spinner size="xl" />
                      <p className="text-body-xs text-text-tertiary mt-2">xl (48px)</p>
                    </div>
                  </div>
                </div>

                {/* Variants */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">Variants</h3>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <Spinner variant="primary" size="lg" />
                      <p className="text-body-xs text-text-tertiary mt-2">primary</p>
                    </div>
                    <div className="text-center">
                      <Spinner variant="secondary" size="lg" />
                      <p className="text-body-xs text-text-tertiary mt-2">secondary</p>
                    </div>
                    <div className="text-center p-4 bg-gray-900 rounded-lg">
                      <Spinner variant="white" size="lg" />
                      <p className="text-body-xs text-gray-400 mt-2">white</p>
                    </div>
                    <div className="text-center text-secondary">
                      <Spinner variant="current" size="lg" />
                      <p className="text-body-xs text-text-tertiary mt-2">current</p>
                    </div>
                  </div>
                </div>

                <CodeBlock>{`import { Spinner } from "@/components/atoms";

// Sizes: xs | sm | md | lg | xl
<Spinner size="md" variant="primary" />

// Variants: primary | secondary | white | current
<Spinner size="lg" variant="white" label="Loading data..." />

// 'current' inherits text color from parent
<span className="text-error">
  <Spinner variant="current" />
</span>`}</CodeBlock>
              </div>
            </Section>

            {/* Skeletons */}
            <Section title="Skeletons" id="skeletons">
              <div className="space-y-8">
                {/* Variants */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">
                    Variants
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-secondary-lightest p-6 rounded-xl">
                      <Skeleton variant="default" className="h-16 w-full mb-2" />
                      <p className="text-body-xs text-text-tertiary">default (bg-white/60)</p>
                      <p className="text-body-xs text-text-tertiary">Best on colored backgrounds</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-border">
                      <Skeleton variant="subtle" className="h-16 w-full mb-2" />
                      <p className="text-body-xs text-text-tertiary">subtle (bg-background-subtle)</p>
                      <p className="text-body-xs text-text-tertiary">Best on white backgrounds</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-border">
                      <Skeleton variant="solid" className="h-16 w-full mb-2" />
                      <p className="text-body-xs text-text-tertiary">solid (bg-border/50)</p>
                      <p className="text-body-xs text-text-tertiary">Higher contrast option</p>
                    </div>
                  </div>
                </div>

                {/* Basic Shapes */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">
                    Shapes
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-background-subtle p-6 rounded-xl">
                    <div>
                      <Skeleton variant="subtle" className="h-20 w-full" />
                      <p className="text-body-xs text-text-tertiary mt-2">box (default)</p>
                    </div>
                    <div>
                      <Skeleton variant="subtle" shape="circle" className="h-20 w-20" />
                      <p className="text-body-xs text-text-tertiary mt-2">circle</p>
                    </div>
                    <div>
                      <Skeleton variant="subtle" shape="text" className="w-full" />
                      <p className="text-body-xs text-text-tertiary mt-2">text (h-4 auto)</p>
                    </div>
                    <div>
                      <Skeleton variant="subtle" shape="pill" className="h-8 w-24" />
                      <p className="text-body-xs text-text-tertiary mt-2">pill</p>
                    </div>
                  </div>
                </div>

                {/* Preset Components */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">
                    Preset Components
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-background-subtle p-6 rounded-xl">
                    <div>
                      <div className="flex items-end gap-2 mb-2">
                        <SkeletonAvatar size="xs" />
                        <SkeletonAvatar size="sm" />
                        <SkeletonAvatar size="md" />
                        <SkeletonAvatar size="lg" />
                        <SkeletonAvatar size="xl" />
                      </div>
                      <p className="text-body-xs text-text-tertiary">SkeletonAvatar (xs|sm|md|lg|xl)</p>
                    </div>
                    <div>
                      <SkeletonText lines={3} />
                      <p className="text-body-xs text-text-tertiary mt-2">SkeletonText (lines, lastLineWidth)</p>
                    </div>
                    <div>
                      <div className="flex gap-2 mb-2">
                        <SkeletonButton size="sm" />
                        <SkeletonButton size="md" />
                        <SkeletonButton size="lg" rounded="full" />
                      </div>
                      <p className="text-body-xs text-text-tertiary">SkeletonButton (sm|md|lg)</p>
                    </div>
                  </div>
                </div>

                {/* Example Card Skeleton */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">
                    Example: Card Skeleton
                  </h3>
                  <div className="max-w-md bg-white border border-border rounded-xl p-4">
                    <div className="flex gap-4">
                      <SkeletonAvatar size="lg" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton shape="text" className="w-1/2" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <SkeletonText lines={2} />
                    </div>
                    <div className="mt-4 flex justify-end">
                      <SkeletonButton rounded="full" />
                    </div>
                  </div>
                </div>

                <CodeBlock>{`import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton
} from "@/components/atoms";

// Base Skeleton
// Variants: default | subtle | solid
// Shapes: box | circle | text | pill
<Skeleton variant="subtle" shape="box" className="h-20 w-full" />

// SkeletonAvatar - sizes: xs | sm | md | lg | xl
<SkeletonAvatar size="lg" />

// SkeletonText - configurable lines
<SkeletonText lines={3} lastLineWidth="w-2/3" />

// SkeletonButton - sizes: sm | md | lg, rounded: default | full
<SkeletonButton size="md" rounded="full" />`}</CodeBlock>
              </div>
            </Section>

            {/* Empty States */}
            <Section title="Empty States" id="empty-states">
              <div className="space-y-8">
                {/* Variants */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">Variants</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <EmptyState
                      variant="default"
                      size="sm"
                      icon="search"
                      title="Default"
                      description="Standard empty state style"
                    />
                    <EmptyState
                      variant="glass"
                      size="sm"
                      icon="inbox"
                      title="Glass"
                      description="Frosted glass effect"
                    />
                    <EmptyState
                      variant="minimal"
                      size="sm"
                      icon="noUsers"
                      title="Minimal"
                      description="No background styling"
                    />
                  </div>
                </div>

                {/* Preset Icons */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">
                    Preset Icons
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {["search", "notFound", "noUsers", "noBookings", "inbox", "error"].map(
                      (icon) => (
                        <EmptyState
                          key={icon}
                          size="sm"
                          icon={icon as any}
                          title={icon}
                          description={`icon="${icon}"`}
                        />
                      )
                    )}
                  </div>
                </div>

                {/* With Actions */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">
                    With Actions
                  </h3>
                  <div className="max-w-lg">
                    <EmptyState
                      icon="search"
                      title="No results found"
                      description="We couldn't find any items matching your search. Try different keywords or filters."
                      action={{
                        label: "Clear filters",
                        onClick: () => alert("Cleared!"),
                      }}
                      secondaryAction={{
                        label: "Learn more",
                        href: "#",
                      }}
                    />
                  </div>
                </div>

                <CodeBlock>{`import { EmptyState } from "@/components/molecules";

<EmptyState
  icon="search"  // or custom: icon={<MyIcon />}
  title="No results found"
  description="Try adjusting your filters"
  variant="default"  // default | glass | minimal
  size="md"          // sm | md | lg
  action={{
    label: "Clear filters",
    onClick: handleClear,
    variant: "primary"
  }}
  secondaryAction={{
    label: "Learn more",
    href: "/help"
  }}
/>`}</CodeBlock>
              </div>
            </Section>

            {/* Mentor Card */}
            <Section title="Mentor Card" id="mentor-card">
              <div className="space-y-8">
                <p className="text-body-md text-text-secondary">
                  The MentorCard displays mentor information with trust signals. Used on the explore mentors page and featured sections.
                </p>

                {/* Data Model */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">Data Model</h3>
                  <div className="bg-background-subtle rounded-xl p-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 pr-4 text-text-primary font-semibold">Field</th>
                          <th className="text-left py-2 pr-4 text-text-primary font-semibold">Type</th>
                          <th className="text-left py-2 pr-4 text-text-primary font-semibold">Required</th>
                          <th className="text-left py-2 text-text-primary font-semibold">Description</th>
                        </tr>
                      </thead>
                      <tbody className="text-text-secondary">
                        <tr className="border-b border-border/50">
                          <td className="py-2 pr-4 font-mono text-xs">name</td>
                          <td className="py-2 pr-4">string</td>
                          <td className="py-2 pr-4">Yes</td>
                          <td className="py-2">Full name</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-2 pr-4 font-mono text-xs">profile_pic</td>
                          <td className="py-2 pr-4">string</td>
                          <td className="py-2 pr-4">No</td>
                          <td className="py-2">Profile picture URL</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-2 pr-4 font-mono text-xs">currentCompany</td>
                          <td className="py-2 pr-4">string</td>
                          <td className="py-2 pr-4">No</td>
                          <td className="py-2">Company name (e.g., "Google")</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-2 pr-4 font-mono text-xs">role</td>
                          <td className="py-2 pr-4">string</td>
                          <td className="py-2 pr-4">No</td>
                          <td className="py-2">Role at company (e.g., "SDE-2")</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-2 pr-4 font-mono text-xs">college</td>
                          <td className="py-2 pr-4">string</td>
                          <td className="py-2 pr-4">No</td>
                          <td className="py-2">College name</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-2 pr-4 font-mono text-xs">grad_year</td>
                          <td className="py-2 pr-4">number</td>
                          <td className="py-2 pr-4">No</td>
                          <td className="py-2">Graduation year (derives years of exp)</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-2 pr-4 font-mono text-xs">tagline</td>
                          <td className="py-2 pr-4">string</td>
                          <td className="py-2 pr-4">No</td>
                          <td className="py-2">Personal bio/tagline</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-2 pr-4 font-mono text-xs">branch</td>
                          <td className="py-2 pr-4">string</td>
                          <td className="py-2 pr-4">No</td>
                          <td className="py-2">Branch/major (shown as badge)</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4 font-mono text-xs">linkedin_url</td>
                          <td className="py-2 pr-4">string</td>
                          <td className="py-2 pr-4">No</td>
                          <td className="py-2">LinkedIn profile URL</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Visual Hierarchy */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">Visual Hierarchy</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { priority: 1, element: "Rating + Sessions + Exp", signal: "Social proof" },
                      { priority: 2, element: "Company + Role", signal: "Credibility" },
                      { priority: 3, element: "Photo", signal: "Human connection" },
                      { priority: 4, element: "Name", signal: "Identity" },
                      { priority: 5, element: "College", signal: "Secondary credibility" },
                      { priority: 6, element: "Tagline", signal: "Personality" },
                    ].map((item) => (
                      <div
                        key={item.priority}
                        className="bg-background-subtle rounded-lg p-3 border border-border"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-5 h-5 rounded-full bg-secondary text-white text-xs font-bold flex items-center justify-center">
                            {item.priority}
                          </span>
                          <span className="text-body-sm font-medium text-text-primary">
                            {item.element}
                          </span>
                        </div>
                        <span className="text-body-xs text-text-tertiary">{item.signal}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Example */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">Featured Variant</h3>
                  <div className="max-w-sm">
                    <MentorCardV2 mentor={mapApiMentorToCardMentor(sampleMentor)} variant="featured" />
                  </div>
                </div>

                {/* Browse Example */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">Browse Variant</h3>
                  <div className="max-w-sm">
                    <MentorCardV2 mentor={mapApiMentorToCardMentor(sampleMentorMinimal)} variant="browse" />
                  </div>
                </div>

                {/* Grid Layout */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">Grid Layout (3 Columns)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MentorCardV2 mentor={mapApiMentorToCardMentor(sampleMentor)} variant="featured" />
                    <MentorCardV2 mentor={mapApiMentorToCardMentor(sampleMentorMinimal)} variant="browse" />
                    <MentorCardV2
                      mentor={{
                        ...mapApiMentorToCardMentor(sampleMentor),
                        lastSessionDate: "Jan 5, 2025",
                        userRating: 5,
                        userSessionCount: 3,
                      }}
                      variant="past"
                    />
                  </div>
                </div>

                {/* Future Variants */}
                <div>
                  <h3 className="text-heading-sm text-text-primary mb-4">Planned Variants</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "default", size: "96px avatar", status: "current" },
                      { name: "compact", size: "48px avatar", status: "planned" },
                      { name: "mini", size: "32px avatar", status: "planned" },
                      { name: "horizontal", size: "120px avatar", status: "planned" },
                    ].map((variant) => (
                      <div
                        key={variant.name}
                        className={`rounded-lg p-4 border ${
                          variant.status === "current"
                            ? "bg-success-light border-success"
                            : "bg-background-subtle border-border"
                        }`}
                      >
                        <p className="text-body-sm font-semibold text-text-primary capitalize">
                          {variant.name}
                        </p>
                        <p className="text-body-xs text-text-secondary">{variant.size}</p>
                        <Badge
                          variant={variant.status === "current" ? "success" : "default"}
                          size="sm"
                          className="mt-2"
                        >
                          {variant.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <CodeBlock>{`import { MentorCardV2 } from "@/app/mentor-card/components";
import { Mentor } from "@/app/mentor-card/types";

// Featured variant (for landing page)
<MentorCardV2 mentor={mentor} variant="featured" />

// Browse variant (for explore page)
<MentorCardV2 mentor={mentor} variant="browse" />

// Past variant (for dashboard/history)
<MentorCardV2
  mentor={{
    ...mentor,
    lastSessionDate: "Jan 5, 2025",
    userRating: 5,
    userSessionCount: 3,
  }}
  variant="past"
/>

// Use mapApiMentorToCardMentor() to convert API data
import { mapApiMentorToCardMentor } from "@/lib/utils";
<MentorCardV2 mentor={mapApiMentorToCardMentor(apiMentor)} variant="browse" />`}</CodeBlock>
              </div>
            </Section>
          </main>
        </div>
      </Container>
    </div>
  );
}
