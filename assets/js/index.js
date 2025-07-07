        fetch('/assets/html/footer.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('footer-placeholder').innerHTML = html;
            });

        // Modal data structure
        const modalData = {
            'service-1': {
                icon: '🌊',
                title: 'Signal Nutrition',
                sections: [
                    {
                        title: 'Overview',
                        content: 'Live data pipelines that adapt to user context and emotional relevance — transforming uncertainty into clarity.',
                        subsections: [
                            {
                                title: 'Core Technology',
                                content: 'Real-time data processing with machine learning models to filter and prioritize health signals.'
                            },
                            {
                                title: 'Applications',
                                content: 'Personalized health monitoring, predictive analytics for chronic conditions, and patient engagement tools.'
                            }
                        ]
                    },
                    {
                        title: 'Technical Details',
                        content: 'Our methodology leverages streaming data architectures and context-aware algorithms to deliver actionable insights.',
                        subsections: [
                            {
                                title: 'Data Pipeline Architecture',
                                content: 'Built on scalable cloud infrastructure with Apache Kafka for real-time data streaming.'
                            },
                            {
                                title: 'Adaptive Algorithms',
                                content: 'Context-driven models using reinforcement learning to adapt to individual patient profiles.'
                            }
                        ]
                    }
                ]
            },
            'service-2': {
                icon: '❤️',
                title: 'Interface Ingestion',
                sections: [
                    {
                        title: 'Overview',
                        content: 'Human-centered interfaces for patients, clinicians, and decision systems — where insight enters with clarity and care.',
                        subsections: [
                            {
                                title: 'User Experience Design',
                                content: 'Intuitive, accessible interfaces designed with user feedback and iterative testing.'
                            },
                            {
                                title: 'Interface Types',
                                content: 'Patient portals, clinician dashboards, and mobile apps for seamless health data interaction.'
                            }
                        ]
                    },
                    {
                        title: 'Implementation',
                        content: 'Our interfaces integrate with existing healthcare systems to ensure smooth data flow and usability.',
                        subsections: [
                            {
                                title: 'Technology Stack',
                                content: 'React for front-end, Node.js for backend, and FHIR-compliant APIs for interoperability.'
                            },
                            {
                                title: 'Integration Patterns',
                                content: 'RESTful APIs and WebSocket for real-time updates with EHR systems.'
                            }
                        ]
                    }
                ]
            },
            'service-3': {
                icon: '🔁',
                title: 'Recursion Logic',
                sections: [
                    {
                        title: 'Overview',
                        content: 'Symbolic architectures and recursive logic — systems that learn, adapt, and reason across time and layers.',
                        subsections: [
                            {
                                title: 'Symbolic Systems',
                                content: 'Knowledge graphs and rule-based systems for structured reasoning in healthcare.'
                            },
                            {
                                title: 'Recursive Patterns',
                                content: 'Iterative learning loops that refine predictions based on historical and real-time data.'
                            }
                        ]
                    },
                    {
                        title: 'Architecture',
                        content: 'Our recursive systems are designed for scalability and adaptability in dynamic environments.',
                        subsections: [
                            {
                                title: 'Layer Management',
                                content: 'Hierarchical models with modular layers for flexible computation.'
                            },
                            {
                                title: 'State Persistence',
                                content: 'Distributed databases with eventual consistency for robust state management.'
                            }
                        ]
                    }
                ]
            },
            'service-4': {
                icon: '🎭',
                title: 'Mask + Meaning',
                sections: [
                    {
                        title: 'Overview',
                        content: 'Simulation as story. Agents with values. Every decision is an act — and every act leaves a trace.',
                        subsections: [
                            {
                                title: 'Agent-Based Modeling',
                                content: 'Simulations of patient and clinician behaviors to optimize care pathways.'
                            },
                            {
                                title: 'Value Systems',
                                content: 'Ethical AI frameworks ensuring decisions align with patient values and clinical guidelines.'
                            }
                        ]
                    },
                    {
                        title: 'Implementation',
                        content: 'Our simulation systems create meaningful insights through agent-based modeling.',
                        subsections: [
                            {
                                title: 'Simulation Engines',
                                content: 'Built with AnyLogic and custom Python frameworks for complex simulations.'
                            },
                            {
                                title: 'Decision Tracking',
                                content: 'Blockchain-inspired ledgers for transparent decision logging.'
                            }
                        ]
                    }
                ]
            },
            'service-5': {
                icon: '🤖',
                title: 'Adaptive + Support',
                sections: [
                    {
                        title: 'Overview',
                        content: 'Evidence-backed decision support tailored to user needs — adapting as data and context change.',
                        subsections: [
                            {
                                title: 'Decision Support Systems',
                                content: 'AI-driven tools providing real-time recommendations for clinicians and patients.'
                            },
                            {
                                title: 'Evidence Integration',
                                content: 'Continuous integration of clinical research and real-world evidence.'
                            }
                        ]
                    },
                    {
                        title: 'Adaptive Features',
                        content: 'Our systems evolve with user needs, ensuring relevance and accuracy.',
                        subsections: [
                            {
                                title: 'Learning Mechanisms',
                                content: 'Online learning algorithms that update models with new data.'
                            },
                            {
                                title: 'Personalization',
                                content: 'Tailored recommendations based on patient history and preferences.'
                            }
                        ]
                    }
                ]
            },
            'timeline-1': {
                icon: '🎲',
                title: 'Tactical — Chance Events',
                sections: [
                    {
                        title: 'Overview',
                        content: 'Immediate response to unpredictable events and chance occurrences.',
                        subsections: [
                            {
                                title: 'Event Detection',
                                content: 'AI-driven anomaly detection to identify critical health events in real time.'
                            },
                            {
                                title: 'Response Protocols',
                                content: 'Automated workflows for rapid response to urgent situations.'
                            }
                        ]
                    },
                    {
                        title: 'Implementation',
                        content: 'Systems designed to handle uncertainty with speed and precision.',
                        subsections: [
                            {
                                title: 'Real-time Processing',
                                content: 'Edge computing for low-latency event handling.'
                            },
                            {
                                title: 'Risk Assessment',
                                content: 'Probabilistic models to evaluate and prioritize risks.'
                            }
                        ]
                    }
                ]
            },
            'timeline-2': {
                icon: '📰',
                title: 'Informational — Weekly Sync',
                sections: [
                    {
                        title: 'Overview',
                        content: 'Regular information gathering and synchronization across systems.',
                        subsections: [
                            {
                                title: 'Data Aggregation',
                                content: 'Centralized data lakes for consolidating multi-source health data.'
                            },
                            {
                                title: 'Sync Protocols',
                                content: 'Scheduled ETL processes for consistent data updates.'
                            }
                        ]
                    },
                    {
                        title: 'Process',
                        content: 'Weekly workflows ensure data integrity and system alignment.',
                        subsections: [
                            {
                                title: 'Update Mechanisms',
                                content: 'Automated scripts for incremental data updates.'
                            },
                            {
                                title: 'Quality Control',
                                content: 'Data validation pipelines to ensure accuracy.'
                            }
                        ]
                    }
                ]
            },
            'timeline-3': {
                icon: '📅',
                title: 'Strategic — Quarterly Plans',
                sections: [
                    {
                        title: 'Overview',
                        content: 'Long-term strategic planning and quarterly milestone management.',
                        subsections: [
                            {
                                title: 'Planning Framework',
                                content: 'Scenario planning tools to align with organizational goals.'
                            },
                            {
                                title: 'Milestone Tracking',
                                content: 'Dashboards for monitoring key performance indicators.'
                            }
                        ]
                    },
                    {
                        title: 'Execution',
                        content: 'Structured processes to execute strategic initiatives.',
                        subsections: [
                            {
                                title: 'Resource Allocation',
                                content: 'Optimization algorithms for efficient resource distribution.'
                            },
                            {
                                title: 'Progress Monitoring',
                                content: 'Regular reports and analytics for strategic oversight.'
                            }
                        ]
                    }
                ]
            },
            'timeline-4': {
                icon: '📍',
                title: 'Operational — Daily Flow',
                sections: [
                    {
                        title: 'Overview',
                        content: 'Day-to-day operational processes and workflow management.',
                        subsections: [
                            {
                                title: 'Workflow Design',
                                content: 'Streamlined processes for clinical and administrative tasks.'
                            },
                            {
                                title: 'Process Optimization',
                                content: 'Lean methodologies to enhance operational efficiency.'
                            }
                        ]
                    },
                    {
                        title: 'Management',
                        content: 'Daily operations are supported by robust management systems.',
                        subsections: [
                            {
                                title: 'Task Coordination',
                                content: 'Task management platforms for seamless coordination.'
                            },
                            {
                                title: 'Performance Monitoring',
                                content: 'Real-time metrics for operational performance.'
                            }
                        ]
                    }
                ]
            },
            'timeline-5': {
                icon: '♾️',
                title: 'Existential — Recursive Meaning',
                sections: [
                    {
                        title: 'Overview',
                        content: 'Deep philosophical and recursive meaning-making processes.',
                        subsections: [
                            {
                                title: 'Meaning Framework',
                                content: 'Frameworks to align technology with human values.'
                            },
                            {
                                title: 'Recursive Processes',
                                content: 'Iterative cycles to refine purpose and impact.'
                            }
                        ]
                    },
                    {
                        title: 'Philosophy',
                        content: 'Our systems are grounded in ethical and existential principles.',
                        subsections: [
                            {
                                title: 'Value Systems',
                                content: 'Core values prioritize patient trust and well-being.'
                            },
                            {
                                title: 'Purpose Definition',
                                content: 'Continuous reflection to ensure alignment with mission.'
                            }
                        ]
                    }
                ]
            }
        };

        // Modal functions
        function openModal(modalId) {
            const data = modalData[modalId];
            if (!data) return;
            
            document.getElementById('modalIcon').textContent = data.icon;
            document.getElementById('modalTitle').textContent = data.title;
            
            const modalBody = document.getElementById('modalBody');
            modalBody.innerHTML = '';
            
            data.sections.forEach(section => {
                const sectionDiv = document.createElement('div');
                sectionDiv.className = 'modal-section';
                
                const sectionTitle = document.createElement('h3');
                sectionTitle.textContent = section.title;
                sectionDiv.appendChild(sectionTitle);
                
                const sectionContent = document.createElement('p');
                sectionContent.textContent = section.content;
                sectionDiv.appendChild(sectionContent);
                
                if (section.subsections) {
                    section.subsections.forEach(subsection => {
                        const subsectionDiv = document.createElement('div');
                        subsectionDiv.className = 'modal-subsection';
                        
                        const subsectionTitle = document.createElement('h4');
                        subsectionTitle.textContent = subsection.title;
                        subsectionDiv.appendChild(subsectionTitle);
                        
                        const subsectionContent = document.createElement('p');
                        subsectionContent.textContent = subsection.content;
                        subsectionDiv.appendChild(subsectionContent);
                        
                        sectionDiv.appendChild(subsectionDiv);
                    });
                }
                
                modalBody.appendChild(sectionDiv);
            });
            
            document.getElementById('modalOverlay').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            document.getElementById('modalOverlay').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Event listeners
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('[data-modal]').forEach(element => {
                element.addEventListener('click', function() {
                    const modalId = this.getAttribute('data-modal');
                    openModal(modalId);
                });
            });
            
            document.getElementById('modalOverlay').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal();
                }
            });
            
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeModal();
                }
            });
        });
 